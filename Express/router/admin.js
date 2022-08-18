// https://www.youtube.com/watch?v=SAZU6-Ucrno
const express = require('express');
const res = require('express/lib/response');
const cors = require('cors');

const admin = express.Router();
// this cors policy only here bind to this admin app, not with the whole application.
admin.use(cors());

// send more parameters in param
// this portion is depricated
admin.param((param, checkName) => (req, res, next, name) => {
        if (name == checkName) {
                next();
        } else {
                res.status(403).send('403!, Access Forbidden');
        }
});


admin.param('user', 'Mostak');


admin.param('name', (req, res, next, name) => {
        console.log("I am executed once");
        req.userName = name;
        next();
});

// Though the param called from two place, but it will executed once.
admin.get('/user/:name', (req, res, next) => {
        console.log('Another middleware called the param');
        next();
});


admin.get('/user/:name', (req, res) => {
        res.send(`Assalamu Alaikum ${req.userName}`);
});



admin.get('/', (req, res) => {
        res.send('Welcome to admin dashboard');
});

admin.get('/login', (req, res) => {
        res.send('Welcome to login page');
});



module.exports = admin;