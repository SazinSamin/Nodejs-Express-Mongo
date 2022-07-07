/*
Title: MonitorApp
Description: API based monitor App
Author: Sazin Reshed Samin
Date: 15-06-2022
*/


// Dependencies 
const http = require('http');
const handler = require('./helper/handleReqRes');
const environment = require('./helper/environments');
const data = require('./lib/data');

// App object - Module scafolding
const app = {};

// App configuration
app.config = {
    // get port according to environment
    port: environment.port,
    token: {
        tokenLength: 16,
        expire: Date.now() + (3600 * 1000),
    }
};





// create a server
app.startServer = () => {
    http.createServer(app.reqResHandler).listen(app.config.port, () => {
        console.log(`server is running on: localhost:${app.config.port}`);
    });
};

// server request & response handler.
app.reqResHandler = handler.reqResHanlder;

// start server
app.startServer();

module.exports = app;


