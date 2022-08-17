// https://www.youtube.com/watch?v=5q3NeKhhLQ0&list=PLHiZ4m8vCp9PHnOIT7gd30PCBoYCpGoQM&index=18
// https://expressjs.com/en/4x/api.html#app.route

const express = require('express');
const app = express();

app.route('/')
        .get((req, res) => {
                console.log('This is a get request');
        })
        .set((req, res) => {
                console.log('This is post request');
        })
        .put((req, res) => {
                console.log("This is a put request"); 
});


app.listen(3000, () => {
        console.log('Server is running in 3000');
});