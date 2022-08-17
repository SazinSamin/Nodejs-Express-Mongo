const express  = require('express');

const app = express();

// accept all types of request methods in a single path 
app.all('/', (req, res) => {
        res.send('Welcome to express app');
});

// set the title of the app
app.set('title', 'My App');
app.get('title') // return the title of the app




app.listen('3000');
