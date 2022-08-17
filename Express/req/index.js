const express = require('express');
const cookieParser =  require('cookie-parser');
const app = express();


// tell express to parse request body in json...
app.use(express.json());
app.use(cookieParser());


app.get('/user/:id/dashboard', (req, res) => {
        // path
        console.log(req.path);
        console.log(req.hostname);
        console.log(req.ip);
        console.log(req.method);
        console.log(req.protocol);
        // here in place of :id, in request we have a paramter which we get here
        console.log(req.params);
        console.log(req.query);
        // console.log(req.body);
        console.log(req.cookies);
        console.log(req.secure);

        // get the app object reference from request & also we can access all property, methods of that app
        console.log(req.app);
        console.log(req.route);


        // return true if client accept that format
        console.log(req.accepts(['json', 'text']));
        // get any header paramter value
        console.log(req.get('accept'));

        // console.log(req.res);

        console.log(req.route);
        console.log(req.accepts('application/json'));

        res.send('Welcome');
});

app.listen(3000, () => {
        console.log('Server is running on 3000');
})