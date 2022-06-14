const http = require('http');
const server = http.createServer((req, res)=> {
    if (req.url === '/') {
        res.write('Welcome to our page');
        res.end();
    } else if (req.url === '/about') {
        res.write('This is Sazin Reshed Samin');
        res.end();
    } else {
        res.write('404! Page not found');
        res.end();
    }
})

server.listen(3000);
console.log('Server is running');
