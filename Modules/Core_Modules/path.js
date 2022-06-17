const path = require('path');
const dir = '/home/samin/Videos/nodejs/index.js';
console.log(path.basename(dir));
console.log(path.parse(dir));

// join path segment together
const myPath = path.join(__dirname, '/index.js');
console.log(myPath);
