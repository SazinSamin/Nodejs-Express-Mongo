const fs = require('fs');
const http = require('http');

const server = http.createServer((req, res) => {
    if(req.url === '/') {
        fs.readFile('index.html', (err, data) => {
            err ? console.log(err) : res.end(data);
        })
    } else if (req.url === '/process') {
        const allChunks = [];
        req.on('data', (chunk) => {
            allChunks.push(chunk);
        })
        req.on('end', () =>  {
            const parsedChunks = Buffer.concat(allChunks).toString();
            console.log(parsedChunks);
            console.log('Stream finished'); 
            res.end('Streaming finished');
        })
    }
});

server.listen(3000);
console.log('Server is online');

