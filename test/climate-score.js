const assert = require('assert');
const { generateGlobals } = require('../src/globals-generator')
const MongoClient = require('mongodb').MongoClient;

var client;

before(async function () {
    client = await MongoClient.connect("mongodb://localhost:27017/", { useUnifiedTopology: true });
});

after(function () {
    client.close();
})

describe('#find()', function () {
    it('responds with matching records', async function () {
        let res = await client.db("atp").collection("sanity").find({}).toArray();
        console.log(res)
        generateGlobals({ 'a': 1 })
        assert.equal([1, 2, 3].indexOf(4), -1);
    });
});
