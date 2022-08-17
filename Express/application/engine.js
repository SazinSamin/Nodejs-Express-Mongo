const express = require('express');
const app = express();

// https://www.youtube.com/watch?v=5q3NeKhhLQ0&list=PLHiZ4m8vCp9PHnOIT7gd30PCBoYCpGoQM&index=18
// https://expressjs.com/en/4x/api.html#app.render
app.set('view engine', 'ejs');

app.route('/')
        .get((req, res) => {
                res.render('index');
});


app.listen(3000, () => {
        console.log('Server is running 3000...');
});