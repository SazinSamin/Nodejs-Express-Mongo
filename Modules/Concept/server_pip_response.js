const http = require('http');
const fs = require('fs');

http.createServer((req, res) => {
    
    const readStream = fs.createReadStream(`${__dirname}/text.txt`, 'utf-8');
    readStream.pipe(res);

}).listen(3000);

console.log('Server is running');
