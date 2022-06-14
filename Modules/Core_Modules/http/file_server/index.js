const http = require('http');
const url = require('url');
const fs = require('fs');

http.createServer((req, res) =>  {
    const q = url.parse(req.url, true);
    const fileName = '.' + q.pathname;
    fs.readFile(fileName, (err, data) => {
        if (!err) {
            res.write(data);
            console.log(`response: ${res.statusCode}`);
            res.end();
        } 
    })

}).listen(3000);
console.log('Server is running...')