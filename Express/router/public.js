const express = require('express');

const public = express.Router();

const logging = (req, res, next) => {
        console.log(`Schedule: ${new Date().toLocaleString()}`);
        next();
};

// this middleware only binds to this public route, not with the whole application.
public.all('*', logging);

public.get('/', (req, res) => {
        res.send('Welcome');
});

public.get('/user', (req, res) => {
        res.send('Hello user');
});

module.exports = public;