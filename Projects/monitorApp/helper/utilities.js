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
                        .update(str)
                        .digest('hex');
                return hashedStr;
        } else {
                return false;
        }
};


utilities.getToken = (tokenLength) => {
        let length = tokenLength;
        length = typeof (tokenLength) === 'number' && tokenLength > 0 ? length : false;
        if (length) {
                let generatedToken = '';
                const possibleCharacter = 'abcdefghijklmnopqrstwxyz0123456789';
                for (let i = 0; i < length; i++) {
                        const randomCharacter = possibleCharacter.charAt(Math.round(Math.random() * possibleCharacter.length));
                        generatedToken += randomCharacter;
                }
                return generatedToken;
        } else {
                return false;
        }
}


// export module
module.exports = utilities;