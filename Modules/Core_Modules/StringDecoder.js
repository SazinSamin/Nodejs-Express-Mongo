// https://nodejs.org/api/string_decoder.html
// https://www.w3schools.com/nodejs/ref_string_decoder.asp
// Using Postman for testing API

const {StringDecoder} = require('string_decoder');
const http = require('http');

const decoder = new StringDecoder();
let payload = '';

http.createServer((req, res) => {

        // listen to the continious streming buffer data & decode through stringDecoder
        // which return the string at once.
        req.on('data', (buffer) => {
                payload += decoder.write(buffer);
        });
        
        // on the end of streaming call StringDecoder end method to end the streaming
        // event, so we can use the StringDecoder's decoder object for listen on another
        // streaming event.
        req.on('end', () => {
                payload += decoder.end();
                console.log(payload);
        });


        res.writeHead(200);
        res.end('200, OK');
}).listen(3000, () => {
        console.log('Server is running on localhost:3000');
});
