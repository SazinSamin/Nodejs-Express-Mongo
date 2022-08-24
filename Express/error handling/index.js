// https://www.youtube.com/watch?v=-iaqGdPNdHw&t=644s

// express handler error by own in case of synchronous code, not for asynchromous because as it's
// behaviour is not predictable.

const express = require('express');
const res = require('express/lib/response');
const fs = require('fs');
const { set } = require('poet');
const app = express();

// synchronous error handle
app.get('/', (req, res) => {
        res.send(a);
});

app.get('/print', (req, res, next) => {
        for(let i = 0; i < 15; i++) {
                if(i === 5) {
                        next('Custom error for 5');
                } else {
                        res.write('a');
                }
        }
        res.end();
})




// asynchronous error handle
app.get('/read', (req, res, next) => {
        fs.readFile('file1.txt', (err, data) => {
                if(err) {
                        next(err);
                } else {
                        res.send(data);
                }
        });
})


// asynchronous error handle custom code
app.get('/time', (req, res, next) => {
        setTimeout(() => {
                try{
                        res.send(a);
                } catch(err) {
                        next(err);
                }
        }, 
        1500)
});


// url not found handler
app.use((req, res, next) => {
        res.send('404! Not found');
});



// error handler, should be in the last of all middlware.
app.use((err, req, res, next) => {
        if(res.headersSent) {
                next('Server side error');
        } else {
                if(err.message) {
                        res.status(500).send(err.message);
                } else {
                        res.status(500).send('Internal server error');
                }
        }
});




app.listen(3000, () => {
        console.log('Server is running in PORT=3000...');
});