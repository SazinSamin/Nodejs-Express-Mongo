/*
Title: MonitorApp
Description: Sample Handler
Author: Sazin Reshed Samin
Date: 15-06-2022
*/


// App object - Module scafolding.
const sampleHander = {};

// samplehandler function
sampleHander.handler = (requestProperties, callback) => {
    callback(200, {
        message: 'This is sample URL',
    })
};

// export module
module.exports = sampleHander;