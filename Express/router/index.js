const express = require('express');
const admin = require('./admin');
const public = require('./public');

const app = express();

app.use('/', public);
app.use('/admin', admin);



app.listen(4000, () => {
        console.log('Server is running on PORT=4000...');
});
