const fs = require('fs');

const myStream = fs.createReadStream(`${__dirname}/text.txt`, 'utf-8');

myStream.on('data', (chunk) => {
    console.log(chunk);
});
