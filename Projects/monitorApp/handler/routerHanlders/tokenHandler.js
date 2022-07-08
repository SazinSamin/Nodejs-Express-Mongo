/*
Title: MonitorApp
Description: Sample Handler
Author: Sazin Reshed Samin
Date: 15-06-2022
*/

// dependicies
const data = require('../../lib/data');
const { getHash, getToken } = require('../../helper/utilities');
const { parseJSON } = require('../../helper/utilities');



// App object - Module scafolding.
const tokenHandler = {};

tokenHandler.acceptedMethods = ['get', 'post', 'put', 'delete'];


// samplehandler function
tokenHandler.handler = (requestProperties, callback) => {
        // check method allowed or not
        if (tokenHandler.acceptedMethods.lastIndexOf(requestProperties.method) > -1) {
                tokenHandler._token[requestProperties.method](requestProperties, (statusCode, payload) => {
                        callback(statusCode, payload);
                })
        } else {
                callback(405, {
                        message: '405! Requested method not allowed',
                })
        }
};


tokenHandler._token = {};
// get or read data
tokenHandler._token.post = (requestProperties, callback) => {
        const phone = typeof (requestProperties.body.phone) === 'string' &&
                requestProperties.body.phone.trim().length == 11 ? requestProperties.body.phone :
                false;

        const password = typeof (requestProperties.body.password) === 'string' &&
                requestProperties.body.password.trim().length > 0 ? requestProperties.body.password :
                false;

        if (phone && password) {
                console.log('validation succesfull');
                data.read('user', phone, (readErr, userData) => {
                        if (!readErr) {
                                let hashedPassword = getHash(password);
                                if (hashedPassword === parseJSON(userData).password) {
                                        const tokenId = getToken(16);
                                        const expireDate = Date.now() + (3600 * 1000);

                                        // combined all to a token object
                                        const tokenObject = {
                                                phone,
                                                'id': tokenId,
                                                expireDate,
                                        };

                                        // store the token
                                        data.create('token', tokenId, tokenObject, (createErr) => {
                                                if (!createErr) {
                                                        callback(200, {
                                                                message: 'Token has successfully generated & stored',
                                                        });
                                                } else {
                                                        callback(400, {
                                                                error: 'Problem in token store in database',
                                                        });
                                                }
                                        });
                                } else {
                                        callback(400, {
                                                message: 'Password didn\'t match',
                                        });
                                }
                        } else {
                                callback(400, {
                                        error: 'Error to read from the database',
                                });
                        }
                });
        } else {
                callback(400, {
                        error: 'Password or Phone number invalid',
                });
        }
};

// get token
tokenHandler._token.get = (requestProperties, callback) => {
        // token number validation
        const token = typeof (requestProperties.queryStringObject.id) === 'string' &&
                requestProperties.queryStringObject.id.trim().length == 16 ? requestProperties.queryStringObject.id :
                false;
        if (token) {
                // lookup in the data for user
                data.read('token', token, (readErr, data) => {
                        // convert JSON string from database to JSON 
                        // using spread operator to do deep copy of object.
                        const tokenData = { ...parseJSON(data) };
                        if (!readErr && tokenData) {
                                // return data to user
                                callback(200, {
                                        message: tokenData,
                                });
                        } else {
                                callback(500, {
                                        message: `Error in reading data from database ${readErr}`,
                                });
                        }
                });
        } else {
                callback(404, {
                        message: '404! Token not found',
                });
        }
};


// update existing data
tokenHandler._token.put = (requestProperties, callback) => {
        console.log(`id: ${requestProperties.body.id}`);
        const id = typeof (requestProperties.body.id) === 'string' &&
                requestProperties.body.id.trim().length == 16 ? requestProperties.body.id :
                false;
        const extend = typeof requestProperties.body.extend === 'boolean' && 
                requestProperties.body.extend === true ? true : false;


        console.log(`id: ${id}`);
        console.log(`extend: ${extend}`);
        if(id && extend) {
                // read the token data from database
                data.read('token', id, (readErr, tokenData) => {
                        if(!readErr) {
                                // convert string to javascript object
                                let tokenObject = parseJSON(tokenData);
                                // check if token already expired or not
                                if (tokenObject.expireDate > Date.now()) {
                                        // extend the token time
                                        tokenObject.expireDate = Date.now() + (3600 * 1000);
                                        // store the extented token time to the database
                                        data.update('token', id, tokenObject, (updateErr) =>{
                                                if(!updateErr) {
                                                        callback(200, {
                                                                message: 'Token expire time has successfully updated',
                                                        });
                                                } else {
                                                        callback(400, {
                                                                message: '400!, Database update error, token time can\'t extented', 
                                                        });
                                                }
                                        });
                                } else {
                                        callback(400, {
                                                message: 'Token has already expired, please log in again',
                                        });
                                }
                        } else {
                                callback(400, {
                                        message: '400! error in reading from the database',
                                });
                        }
                });
        } else {
                callback(400, {
                        message: '400!, Bad Request',
                });
        }

};

// delete existing data
tokenHandler._token.delete = (requestProperties, callback) => {
        // tokne number validation
        const id = typeof (requestProperties.queryStringObject.id) === 'string' &&
                requestProperties.queryStringObject.id.trim().length == 16 ? requestProperties.queryStringObject.id :
                false;

        if (id) {
                data.read('token', id, (readErr, tokenData) => {
                        if (!readErr && tokenData) {
                                data.delete('token', id, (deleteErr) => {
                                        if (!deleteErr) {
                                                callback(200, {
                                                        message: `Token data has successfully deleted`,
                                                });
                                        } else {
                                                callback(500, {
                                                        error: `Error in data deletation, ${deleteErr}`,
                                                });
                                        }
                                });
                        } else {
                                callback(500, {
                                        error: `Problem in read from database ${readErr}`,
                                });
                        }
                });
        } else {
                callback(400, {
                        error: '400! Bad request, Invalid id number',
                });
        }
};



// export module
module.exports = tokenHandler;