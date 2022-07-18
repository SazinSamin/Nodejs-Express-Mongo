/*
Title: MonitorApp
Description: Sample Handler
Author: Sazin Reshed Samin
Date: 15-06-2022
*/

// dependicies
const data = require('../../lib/data');
const { getHash, getToken } = require('../../helper/utilities');
const { create, read, update } = require("../../lib/data");
const { parseJSON } = require('../../helper/utilities');
const tokenHandler = require('../routerHanlders/tokenHandler');
const config = require('../../index');
const { user } = require('../../routes');


// App object - Module scafolding.
const checkHandler = {};

checkHandler.acceptedMethods = ['get', 'post', 'put', 'delete'];
checkHandler.protocols = ['http', 'https'];



// samplehandler function
checkHandler.handler = (requestProperties, callback) => {
        // check method allowed or not
        if (checkHandler.acceptedMethods.lastIndexOf(requestProperties.method) > -1) {
                checkHandler._check[requestProperties.method](requestProperties, (statusCode, payload) => {
                        callback(statusCode, payload);
                })
        } else {
                callback(405, {
                        message: '405! Requested method not allowed',
                })
        }
};


checkHandler._check = {};
// get or read data
checkHandler._check.get = (requestProperties, callback) => {
        const id = typeof (requestProperties.queryStringObject.id) === 'string' &&
                requestProperties.queryStringObject.id.trim().length == 16 ? requestProperties.queryStringObject.id :
                false;

        if(id) {
                data.read('checks', id, (readErr, checkData) => {
                        if(!readErr && checkData) {

                                // get the phone number
                                const phone = parseJSON(checkData).userPhone;
                                // get the token from the request hader & verify
                                const token = typeof (requestProperties.headerObject.token) === 'string' ? requestProperties.headerObject.token : false;  
                               
                                tokenHandler._token.verifyToken(token, phone, (isTokenValid) => {
                                        if (isTokenValid) {
                                                callback(200, parseJSON(checkData));
                                        } else {
                                                callback(403, {
                                                        err: 'Authentication failure, please log in again',
                                                });
                                        }
                                });
                        } else {
                                callback(500, {
                                        err: `Read error: ${readErr}`,
                                });
                        }
                });
        } else {
                callback(400, {
                        err: `400! Bad Request, Invalid request`,
                });
        }
};

// create new data
checkHandler._check.post = (requestProperties, callback) => {

        // input validation
        let protocols = typeof (requestProperties.body.protocols) === 'string' &&
                checkHandler.protocols.lastIndexOf(requestProperties.body.protocols) > -1 ?
                requestProperties.body.protocols : false;
        let url = typeof (requestProperties.body.url) === 'string' && requestProperties.body.url.trim().length > 0 ?
                requestProperties.body.url : false;
        let method = typeof (requestProperties.body.method) === 'string' && checkHandler.acceptedMethods.indexOf(requestProperties.body.method.toLowerCase()) > -1 ?
                requestProperties.body.method : false;
        let successCode = typeof (requestProperties.body.successCode) === 'object' && requestProperties.body.successCode instanceof Array ?
                requestProperties.body.successCode : false;

        let timeoutSecondsRaw = requestProperties.body.timeoutSeconds;
        let timeoutSeconds = typeof (timeoutSecondsRaw) === 'number' && timeoutSecondsRaw % 1 === 0 && timeoutSecondsRaw >= 1 && timeoutSecondsRaw <= 5 ?
                timeoutSecondsRaw : false;

        // get the token from the request hader & verify
        const token = typeof (requestProperties.headerObject.token) === 'string' ? requestProperties.headerObject.token : false;  
        // get the phone number
        const phone = typeof (requestProperties.queryStringObject.phone) === 'string' &&
                requestProperties.queryStringObject.phone.trim().length == 11 ? requestProperties.queryStringObject.phone :
                false;



        if(protocols && url && method && successCode && timeoutSeconds) {
                data.read('token', token, (readErr, tokenData) => {
                        if (!readErr && tokenData) {
                                let userPhone = parseJSON(tokenData).phone;
                                data.read('user', userPhone, (readErr, userData) => {
                                        if (!readErr && userData) {
                                                tokenHandler._token.verifyToken(token, userPhone, (tokenValid) => {
                                                        if(tokenValid) {
                                                                let userObj = parseJSON(userData);
                                                                let userChecks = typeof(userObj.checks) === 'object' && userObj.checks instanceof Array ? userObj.checks : [];
                                                                
                                                                console.log(userChecks.length);
                                                                // inspect check limit has exceeded or not
                                                                if(userChecks.length < 5) {
                                                                        const checkId = getToken(16);
                                                                        const checkObj = {
                                                                                'id': checkId,
                                                                                'userPhone': userPhone,
                                                                                protocols,
                                                                                url,
                                                                                method,
                                                                                successCode,
                                                                                timeoutSeconds,
                                                                        };

                                                                        // save check Data to the database

                                                                        data.create('checks', checkId, checkObj, (createErr) => {
                                                                                if(!createErr) {
                                                                                        // add check's Id to the user object
                                                                                        userObj.check = userChecks;
                                                                                        userObj.check.push(checkId);

                                                                                        // update the user database
                                                                                        data.update('user', userPhone, userObj, (updateErr) => {
                                                                                                if(!updateErr) {
                                                                                                        callback(200, {
                                                                                                                message: 'User data update successfully & add check details',
                                                                                                                checkObj,
                                                                                                        });
                                                                                                } else {
                                                                                                        callback(500, {
                                                                                                                message: 'Can\'t update the user\'s database', 
                                                                                                        });
                                                                                                }
                                                                                        });


                                                                                } else {
                                                                                        callback(500, {
                                                                                                err: `Can't save: ${createErr}`,
                                                                                        });
                                                                                }
                                                                        });
                                                                } else {
                                                                        callback(401, {
                                                                                err: 'You have exceeded the check limit',
                                                                        });
                                                                }

                                                        } else {
                                                                callback(401, {
                                                                        err: 'Invalid token or token has expire',
                                                                });
                                                        }
                                                });
                                        } else {
                                                callback(400, {
                                                        err: `User data read error: ${readErr}`,
                                                });
                                        }
                                });
                        } else {
                                callback(400, {
                                        err: `Token data read error: ${readErr}`
                                });
                        }
                });
        } else {
                callback(400, {
                        err: "Bad request",
                });
        }

        
};


// update existing data
checkHandler._check.put = (requestProperties, callback) => {

        const id = typeof (requestProperties.body.id) === 'string' &&
                requestProperties.body.id.trim().length == 16 ? requestProperties.body.id :
                false;
        
        // input validation
        let protocols = typeof (requestProperties.body.protocols) === 'string' &&
                checkHandler.protocols.lastIndexOf(requestProperties.body.protocols) > -1 ?
                requestProperties.body.protocols : false;
        let url = typeof (requestProperties.body.url) === 'string' && requestProperties.body.url.trim().length > 0 ?
                requestProperties.body.url : false;
        let method = typeof (requestProperties.body.method) === 'string' && checkHandler.acceptedMethods.indexOf(requestProperties.body.method.toLowerCase()) > -1 ?
                requestProperties.body.method : false;
        let successCode = typeof (requestProperties.body.successCode) === 'object' && requestProperties.body.successCode instanceof Array ?
                requestProperties.body.successCode : false;

        let timeoutSecondsRaw = requestProperties.body.timeoutSeconds;
        let timeoutSeconds = typeof (timeoutSecondsRaw) === 'number' && timeoutSecondsRaw % 1 === 0 && timeoutSecondsRaw >= 1 && timeoutSecondsRaw <= 5 ?
                timeoutSecondsRaw : false;

        // get the token from the request hader & verify
        const token = typeof (requestProperties.headerObject.token) === 'string' ? requestProperties.headerObject.token : false;


        if(id) {
                if(protocols || url || method || successCode || timeoutSeconds) {
                        data.read('checks', id, (readErr, checkData) => {
                                console.log(readErr);
                                console.log(checkData);
                                if(!readErr && checkData) {
                                        let parsedCheckData = parseJSON(checkData);
                                        let userPhone = parsedCheckData.userPhone;
                                        console.log(`${id}`);
                                        console.log(`${userPhone}`);
                                        tokenHandler._token.verifyToken(token, userPhone, (tokenValidation) => {
                                                if(tokenValidation) {
                                                        if(protocols) {
                                                                parsedCheckData.protocols = protocols;
                                                        }
                                                        if (url) {
                                                                parsedCheckData.url = url;
                                                        }
                                                        if (method) {
                                                                parsedCheckData.method = method;
                                                        }
                                                        if (successCode) {
                                                                parsedCheckData.successCode = successCode;
                                                        }
                                                        if (timeoutSeconds) {
                                                                parsedCheckData.timeoutSeconds = timeoutSeconds;
                                                        }


                                                        // save updated data to the database
                                                        data.update('checks', id, parsedCheckData, (updateErr) => {
                                                                if(!updateErr) {
                                                                        callback(200, parsedCheckData);
                                                                } else {
                                                                        callback(500, {
                                                                                err: '500! Database update error',
                                                                        });
                                                                }
                                                        });

                                                } else {
                                                        callback(403, {
                                                                message: '403! Authorization error',
                                                        })
                                                }
                                        })
                                } else {
                                        callback(500, {
                                                err: `Problem in reading from database ${readErr}`,
                                        });
                                }
                        });
                } else {
                        callback(400, {
                                err: '400, Bad Request, fill at least one field for update',
                        });
                }
        } else {
                callback(404, {
                        err: '404! User not found',
                });
        }

};

// delete existing data
checkHandler._check.delete = (requestProperties, callback) => {
        const id = typeof (requestProperties.queryStringObject.id) === 'string' &&
                requestProperties.queryStringObject.id.trim().length == 16 ? requestProperties.queryStringObject.id :
                false;



        console.log(`id: ${id}`);        
        console.log(requestProperties.queryStringObject.id);
        if (id) {
                data.read('checks', id, (readErr, checkData) => {
                        if (!readErr && checkData) {

                                // get the phone number
                                const phone = parseJSON(checkData).userPhone;
                                // get the token from the request hader & verify
                                const token = typeof (requestProperties.headerObject.token) === 'string' ? requestProperties.headerObject.token : false;

                                tokenHandler._token.verifyToken(token, phone, (isTokenValid) => {
                                        if (isTokenValid) {
                                                
                                                // delete the check data from the database
                                                data.delete('checks', id, (deleteErr) => {
                                                        if(!deleteErr) {
                                                                data.read('user', phone, (readErr, userData) => {
                                                                        if(!readErr && userData) {
                                                                                let userObj = parseJSON(userData);
                                                                                let userChecks = typeof(userObj.check) === 'object' && userObj.check instanceof Array ? userObj.check : [];

                                                                                // remove the delete check from the user's data
                                                                                 console.log(userObj);
                                                                                 console.log(`id: ${id}`);
                                                                                let checkPosition = userChecks.indexOf(id);
                                                                                console.log(`checkPosition: ${checkPosition}`);
                                                                                if(checkPosition > -1) {
                                                                                        userChecks.splice(checkPosition, 1);

                                                                                        // resave the data to the database
                                                                                        userObj.check = userChecks;
                                                                                        
                                                                                        // update the database
                                                                                        data.update('user', phone, userObj, (updateErr) => {
                                                                                                if(!updateErr) {
                                                                                                        callback(200, {
                                                                                                                message: 'Check deleted & User data updaed',
                                                                                                        })
                                                                                                } else {
                                                                                                        callback(500, {
                                                                                                                err: `Data can't update: ${updateErr}`,
                                                                                                        });
                                                                                                }
                                                                                        });
                                                                                } else {
                                                                                        callback(500, {
                                                                                                err: `Check not found in User's data`,
                                                                                        })
                                                                                }


                                                                        } else {
                                                                                callback(500, {
                                                                                        err: `Error in reading from the database: ${readErr}`
                                                                                });
                                                                        }
                                                                });
                                                        } else {
                                                                callback(500, {
                                                                        err: `Error in file deletation: ${deleteErr}`,
                                                                });
                                                        }
                                                });

                                        } else {
                                                callback(403, {
                                                        err: 'Authentication failure, please log in again',
                                                });
                                        }
                                });
                        } else {
                                callback(500, {
                                        err: `Read error: ${readErr}`,
                                });
                        }
                });
        } else {
                callback(400, {
                        err: `400! Bad Request, Invalid request`,
                });
        }
};



// export module
module.exports = checkHandler;