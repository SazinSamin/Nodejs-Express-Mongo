/*
Title: MonitorApp
Description: API based monitor App
Author: Sazin Reshed Samin
Date: 15-06-2022
*/

// Dependencies
const url = require('url');
const {StringDecoder} = require('string_decoder');
const routes = require('../routes');
const notFoundHanlder = require('../handler/routerHanlders/notFoundHandler');
const {parseJSON} = require('../helper/utilities');


// App Object - Module scafolding
const handler = {};


handler.reqResHanlder = (req, res) => {
    // handling request
    const parsedUrl = url.parse(req.url, true);
    const path = parsedUrl.pathname;
    const trimmedPath = path.replace(/^\/+|\/+/g, '');
    const method = req.method.toLowerCase();
    const queryStringObject = parsedUrl.query;
    const headerObject = req.headers;

    const decoderObj = new StringDecoder();
    let payload = '';


    const requestProperties = {
        parsedUrl, path, trimmedPath, method, queryStringObject, headerObject,
    }

    console.log(routes[trimmedPath]);
    const chosenHandler = routes[trimmedPath] ? routes[trimmedPath] : notFoundHanlder.handler;
    console.log(chosenHandler);

    req.on('data', (buffer) => {
        payload += decoderObj.write(buffer);
        // console.log(`Body: ${payload}`);
    });

    req.on('end', () => {
        payload += decoderObj.end();

        // add new property to "requestProperties" & check the user send payload are 
        // valied JSON object
        requestProperties.body = parseJSON(payload);

        chosenHandler(requestProperties, (statusCode, payload) => {
            statusCode = typeof(statusCode) === 'number' ? statusCode : 500;
            payload = typeof(payload) === 'object' ? payload : {};
           

    
            // stringfy the payload to give json result
            payloadString = JSON.stringify(payload);
            // console.log(`payloadString: ${payloadString}`);


            // set additional header
            res.setHeader('Content-Type', 'application/json');
            res.setHeader('Server-Desginer', 'Sazin Reshed Samin');

            // return the final response
            res.writeHead(statusCode);
            res.end(payloadString);
        });
    });


};

module.exports = handler;