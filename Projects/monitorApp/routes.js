// dependencies
const sampleHander = require('./handler/routerHanlders/sampleHander');
const userHandler = require('./handler/routerHanlders/userHandler');
const tokenHandler = require('./handler/routerHanlders/tokenHandler');
const checkHandler = require('./handler/routerHanlders/checkHandler');


const routes = {
    'sample': sampleHander.handler,
    'user' : userHandler.handler,
    'token': tokenHandler.handler,
    'check': checkHandler.handler,
};
module.exports = routes;