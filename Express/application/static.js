const express = require('express');

const app = express();

// https://expressjs.com/en/4x/api.html#express.static

// serving data in static path from app directory or any other directory
app.use(express.static(`${__dirname}/content/`, {
        // in default it will search for any file name "index" in given specifiq directory, but we can also 
        // specify the page we want to server
        index: 'home.html',
}));

app.get('/', (req, res) => {
        res.send('App is live...');
});

app.post('/', (req, res) => {
        res.send('App is accepting request');
});

app.listen(3000, () => {
        console.log('Server is running at 3000');
});
