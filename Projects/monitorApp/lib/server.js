/*
Title: MonitorApp
Description: API based monitor App
Author: Sazin Reshed Samin
Date: 15-06-2022
*/


// Dependencies 
const http = require('http');
const handler = require('../helper/handleReqRes');
const environment = require('../helper/environments');


// App object - Module scafolding
const server = {};


// server configuration
server.config = {
    // get port according to environment
    port: environment.port,
    maxCheck: 5,
    token: {
        tokenLength: 16,
        expire: Date.now() + (3600 * 1000),
    }
};


// create a server
server.startServer = () => {
    http.createServer(server.reqResHandler).listen(server.config.port, () => {
        console.log(`server is running on: localhost:${server.config.port}`);
    });
};


// server request & response handler.
server.reqResHandler = handler.reqResHanlder;


// server initialization
server.init = () => {
    server.startServer();
}


// export module
module.exports = server;


