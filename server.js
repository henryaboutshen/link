const MongoClient = require('mongodb').MongoClient;
const fs = require('fs');

const globals = 'Newman.postman_globals.json'
const url = "mongodb://localhost:27017/";

var data = JSON.parse(fs.readFileSync(globals));

var addGlobal = (key, value) => {
  data["values"].push({
    "key": key,
    "value": value,
    "enabled": true
  })
}

MongoClient.connect(url, { useUnifiedTopology: true }, function(err, client) {
    if (err) throw err;
    var db = client.db("atp");
    db.collection("sanity").find({}).toArray(function(err, result) {
        if (err) throw err;
        console.log(result);
        addGlobal(result[0].Name, result[0].Name)
        client.close();

        var str = JSON.stringify(data, null, "\t");
        fs.writeFileSync("render.json", str);
    });
});
