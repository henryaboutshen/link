const fs = require('fs');
const _ = require('lodash');

/**
 * Generate globals file.
 * 
 * @param {map} map 
 */
const generateGlobals = (map) => {
    let data = JSON.parse(fs.readFileSync("./src/globals-template.json"));
    _.forEach(map, function(value, key) {
        data["values"].push({
            "key": key,
            "value": value,
            "enabled": true
        })
    });
    fs.writeFileSync("./globals/Newman.postman_globals.json", JSON.stringify(data, null, "\t"));
}

module.exports ={
    generateGlobals
}
