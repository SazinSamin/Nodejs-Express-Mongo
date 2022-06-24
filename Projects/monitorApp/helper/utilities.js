// Dependencies
const hash = require('crypto');
const environment = require('./environments');

// App object - Module Scafolding
const utilities = {};


// function to validation a valid JSON object
utilities.parseJSON = (jsonString) => {
        let parsedData = {};
        try {
                parsedData = JSON.parse(jsonString);
        } catch (e) {
                console.log(`error: ${e}`);
        }
        return parsedData;
};

// function to get hashing
utilities.getHash = (str) => {
        if (typeof (str) === 'string' && str.length > 0) {
                let hashedStr = hash.createHmac('sha256', environment.hashKey)
                        .update('Don\'t love me')
                        .digest('hex');
                return hashedStr;
        } else {
                return false;
        }
};


// export module
module.exports = utilities;