/*
Title: MonitorApp
Description: API based monitor App
Author: Sazin Reshed Samin
Date: 15-06-2022
*/


// Dependencies 
const { check } = require('../routes');
const data = require('./data');


// App object - Module scafolding
const worker = {};


// gather all checks data
worker.gatherAllCheck = () => {
        // get all the chceks
        data.listAllFileName('checks', (err, checks) => {
                if(!err && checks && checks.checksArr.length > 0) {
                        console.log(checks.checksArr);
                } else {
                        console.log(`Can\'t find any checks in database ${err}`);
                }
        });
}


// timer for executing the process per on minutes
worker.loop = () => {
        setInterval(() => {
                worker.gatherAllCheck();
        }, 1000 * 60);
};

// worker initialization
worker.init = () => {
        // execute all the checks
        worker.gatherAllCheck();
        // call the loop so that the check execution running on background
        worker.loop();
};


// export module
module.exports = worker;


