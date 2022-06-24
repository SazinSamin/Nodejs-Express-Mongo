// dependencies
const sampleHander = require('./handler/routerHanlders/sampleHander');
const userHandler = require('./handler/routerHanlders/userHandler');



const routes = {
    'sample': sampleHander.handler,
    'user' : userHandler.handler,
};

module.exports = routes;