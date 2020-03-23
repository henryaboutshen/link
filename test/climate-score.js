const assert = require('assert');
const { generateGlobals } = require('../src/globals-generator')
const MongoClient = require('mongodb').MongoClient;

var client;
var variables = {};

before(async function () {
    client = await MongoClient.connect("mongodb://localhost:27017/", { useUnifiedTopology: true });
});

after(function () {
    client.close();
    generateGlobals(variables);
})

describe('#find()', function () {
    it('responds with matching records', async function () {
        let res = await client.db("atp").collection("sanity").find({}).toArray();
        console.log(res)
        assert.equal(res[0]["Name"], "Case 1");
        variables["Name"] = res[0]["Name"];
    });
});

describe('#find()', function () {
    it('responds with matching records', async function () {
        let res = await client.db("atp").collection("sanity").find({}).toArray();
        console.log(res)
        assert.equal(res[0]["Name"], "Case 1");
        variables["Name2"] = res[1]["Name"];
    });
});
