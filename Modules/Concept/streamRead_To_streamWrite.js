const fs = require('fs');

const readStream = fs.createReadStream(`${__dirname}/text.txt`);
const writeStream = fs.createWriteStream(`${__dirname}/result.txt`);

readStream.on('data', (chunk) => {
    writeStream.write(chunk);
})
