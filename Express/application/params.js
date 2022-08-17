const app = require('express')();

// https://www.youtube.com/watch?v=5q3NeKhhLQ0&list=PLHiZ4m8vCp9PHnOIT7gd30PCBoYCpGoQM&index=18
// https://expressjs.com/en/4x/api.html#app.param

// callback to trigger for specifiq paramter in http request.
app.param('id', (req, res, next, id) => {
        req.userId = id;
        next();
});

// get the parameter value of http request & trigger callback for that parameter using app.param
app.all('/:id', (req, res) => {
        res.send(`Requested id is ${req.userId}`);
});

app.listen(3000, () => {
        console.log('Server is running on 3000');
});