/*
Title: MonitorApp
Description: Sample Handler
Author: Sazin Reshed Samin
Date: 15-06-2022
*/

// dependicies
const data = require('../../lib/data');
const { getHash } = require('../../helper/utilities');
const { create, read, update } = require("../../lib/data");
const { parseJSON } = require('../../helper/utilities');
const tokenHandler = require('../routerHanlders/tokenHandler');


// App object - Module scafolding.
const userHandler = {};

userHandler.acceptedMethods = ['get', 'post', 'put', 'delete'];


// samplehandler function
userHandler.handler = (requestProperties, callback) => {
    // check method allowed or not
    if (userHandler.acceptedMethods.lastIndexOf(requestProperties.method) > -1) {
        userHandler._user[requestProperties.method](requestProperties, (statusCode, payload) => {
            callback(statusCode, payload);
        })
    } else {
        callback(405, {
            message: '405! Requested method not allowed',
        })
    }
};


userHandler._user = {};
// get or read data
userHandler._user.get = (requestProperties, callback) => {
    // phone number validation
    const phone = typeof (requestProperties.queryStringObject.phone) === 'string' &&
        requestProperties.queryStringObject.phone.trim().length == 11 ? requestProperties.queryStringObject.phone :
        false;

    // get the token from the request hader & verify
    const token = typeof(requestProperties.headerObject.token) === 'string' ? requestProperties.headerObject.token : false;  

    if (phone) {

        // verify token
        tokenHandler._token.verifyToken(token, phone, (res) => {
            console.log(`res: ${res}`);
            if (res) {
                // lookup in the data for user
                data.read('user', phone, (readErr, data) => {
                    // convert JSON string from database to JSON 
                    // using spread operator to do deep copy of object.
                    const user = { ...parseJSON(data) };
                    if (!readErr && user) {
                        // delete confedential information
                        delete user.password;
                        // return data to user
                        callback(200, {
                            message: user,
                        });
                    } else {
                        callback(500, {
                            message: `Error in reading data from database ${readErr}`,
                        });
                    }
                });
            } else {
                callback(403, {
                    error: 'Authentication failed, please log in again',
                });
            }
        });
    } else {
        callback(404, {
            message: `404! ${requestProperties.queryStringObject.phone} user not found `,
        });
    }
};

// create new data
userHandler._user.post = (requestProperties, callback) => {
    // declearation of user properties & validation
    const firstName = typeof (requestProperties.body.firstName) === 'string' &&
        requestProperties.body.firstName.trim().length > 0 ? requestProperties.body.firstName :
        false;

    const lastName = typeof (requestProperties.body.lastName) === 'string' &&
        requestProperties.body.lastName.trim().length > 0 ? requestProperties.body.lastName :
        false;

    const phone = typeof (requestProperties.body.phone) === 'string' &&
        requestProperties.body.phone.trim().length == 11 ? requestProperties.body.phone :
        false;

    const password = typeof (requestProperties.body.password) === 'string' &&
        requestProperties.body.password.trim().length > 0 ? requestProperties.body.password :
        false;

    const toaString = typeof (requestProperties.body.toaString) === 'boolean'
        ? requestProperties.body.toaString :
        false;

    console.log(`firstName: ${firstName}`);
    console.log(`lastName: ${lastName}`);
    console.log(`password: ${password}`);
    console.log(`phone: ${phone}`);
    console.log(`toaString: ${toaString}`);

    if (firstName && lastName && phone && password && toaString) {

        data.read('user', phone, (readErr, existingUserData) => {
            // check if user already exits or not, it user doesn't exits then it can't able to 
            // read data so, it throw an readError, which in here we conclude that user doesn't
            // exits, so we can insert user data.
            if (readErr) {
                // make a conciled user object to get all data in one
                const userObject = {
                    firstName,
                    lastName,
                    phone,
                    password: getHash(password),
                    toaString,
                };
                // store userObject data to database
                data.create('user', phone, userObject, (createErr) => {
                    console.log(`${createErr}`);
                    if (!createErr) {
                        callback(200, {
                            message: 'Congratulation! User has created Successfully',
                        });
                    } else {
                        callback(500, {
                            message: `Problem in User creation & can\'t write data to the database: \n${createErr}`,
                        });
                    }
                });
            } else {
                callback(500, {
                    message: `500! User already exits, use another phone number: \n${readErr}`,
                });
            }
        });
    } else {
        callback(400, {
            message: '400! Bad Request',
        });
    }
};


// update existing data
userHandler._user.put = (requestProperties, callback) => {
    // user data validation
    const firstName = typeof (requestProperties.body.firstName) === 'string' &&
        requestProperties.body.firstName.trim().length > 0 ? requestProperties.body.firstName :
        false;

    const lastName = typeof (requestProperties.body.lastName) === 'string' &&
        requestProperties.body.lastName.trim().length > 0 ? requestProperties.body.lastName :
        false;

    const phone = typeof (requestProperties.body.phone) === 'string' &&
        requestProperties.body.phone.trim().length == 11 ? requestProperties.body.phone :
        false;

    const password = typeof (requestProperties.body.password) === 'string' &&
        requestProperties.body.password.trim().length > 0 ? requestProperties.body.password :
        false;

    // get the token from the request hader & verify
    const token = typeof (requestProperties.headerObject.token) === 'string' ? requestProperties.headerObject.token : false;  


    if (phone) {

        // verify token
        tokenHandler._token.verifyToken(token, phone, (res) => {
            console.log(`res: ${res}`);
            if (res) {
                if (firstName || lastName || password) {
                    // lookup on database for user data
                    data.read('user', phone, (readErr, userData) => {
                        const retrievedData = { ...parseJSON(userData) };
                        if (!readErr && retrievedData) {
                            if (firstName) {
                                retrievedData.firstName = firstName;
                            }
                            if (lastName) {
                                retrievedData.lastName = lastName;
                            }
                            if (password) {
                                retrievedData.password = getHash(password);
                            }


                            // store the updated data
                            data.update('user', phone, retrievedData, (updateErr) => {
                                if (!updateErr) {
                                    callback(200, {
                                        message: 'User data has updated successfully',
                                    });
                                } else {
                                    callback(500, {
                                        error: `Update error: ${updateErr}`,
                                    });
                                }
                            });
                        } else {
                            callback(500, {
                                error: `File system read error ${readErr}`,
                            });
                        }
                    });
                } else {
                    callback(400, {
                        error: '400! Bad request!, Give at least one parameter',
                    });
                }
            } else {
                callback(403, {
                    error: 'Authentication failed, please log in again',
                });
            }
        });
    } else {
        callback(400, {
            error: '400! Bad request, Invalid phone number',
        });
    }
};

// delete existing data
userHandler._user.delete = (requestProperties, callback) => {
    // phone number validation
    const phone = typeof (requestProperties.queryStringObject.phone) === 'string' &&
        requestProperties.queryStringObject.phone.trim().length == 11 ? requestProperties.queryStringObject.phone :
        false;

    // get the token from the request hader & verify
    const token = typeof (requestProperties.headerObject.token) === 'string' ? requestProperties.headerObject.token : false;  

    if(phone) {


        // verify token
        tokenHandler._token.verifyToken(token, phone, (res) => {
            console.log(`res: ${res}`);
            if (res) {
                data.read('user', phone, (readErr, userData) => {
                    if (!readErr && userData) {
                        data.delete('user', phone, (deleteErr) => {
                            if (!deleteErr) {
                                callback(200, {
                                    message: `${phone} data has successfully deleted`,
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
                callback(403, {
                    error: 'Authentication failed, please log in again',
                });
            }
        });   
    } else {
        callback(400, {
            error: '400! Bad request, Invalid phone number',
        });
    }
};



// export module
module.exports = userHandler;