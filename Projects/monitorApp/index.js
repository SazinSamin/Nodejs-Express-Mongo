/*
Title: MonitorApp
Description: API based monitor App
Author: Sazin Reshed Samin
Date: 15-06-2022
*/


// Dependencies 
const server = require('./lib/server');
const worker = require('./lib/worker');


// App object - Module scafolding
const app = {};

app.init = () => {
        // start the server
        server.init();
        // start the worker
        worker.init();
};

app.init();


// export module
module.exports = app;


