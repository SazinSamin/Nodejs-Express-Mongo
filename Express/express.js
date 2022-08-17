const express = require('express');

const app = express();

app.get('/', (req, res) => {
        res.send('Application is live...');
});

app.post('/post', (req, res) => {
        res.send('Application is recieving the data...');
});

app.listen(3000, () => {
        console.log(`Application is running on 3000...`);
});
