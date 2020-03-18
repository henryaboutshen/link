const MongoClient = require('mongodb').MongoClient;
const fs = require('fs');

const config = JSON.parse(fs.readFileSync("./src/config.json"));
const url = config["url"];
const database = config["database"];
const collection = config["collection"];

var data = JSON.parse(fs.readFileSync("./src/globals-template.json"));

/**
 * 
 * @param {*} key 
 * @param {*} value 
 */
var addGlobal = (key, value) => {
    data["values"].push({
        "key": key,
        "value": value,
        "enabled": true
    })
}

/**
 * 
 * @param {*} url 
 */
var connect = (url) => {
    return MongoClient.connect(url, { useUnifiedTopology: true });
}

/**
 * 
 * @param {*} client 
 */
var find = (client, query) => {
    return client.db(database).collection(collection).find(query).toArray();
}

(async() => {
    let client = await connect(url);
    let result = await find(client, {});
    console.log(result);
    addGlobal("Name", result[0]['Name'])
    result = await find(client, {"Name": "Case 1"});
    console.log(result);
    addGlobal("AnotherName", result[0]['Name'])
    client.close();
    fs.writeFileSync("./globals/Newman.postman_globals.json", JSON.stringify(data, null, "\t"));
})()
