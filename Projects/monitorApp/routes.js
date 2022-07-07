// dependencies
const sampleHander = require('./handler/routerHanlders/sampleHander');
const userHandler = require('./handler/routerHanlders/userHandler');
const tokenHandler = require('./handler/routerHanlders/tokenHandler');


const routes = {
    'sample': sampleHander.handler,
    'user' : userHandler.handler,
    'token': tokenHandler.handler,
};

module.exports = routes;