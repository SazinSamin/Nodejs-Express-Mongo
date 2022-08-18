// https://www.youtube.com/watch?v=JC8pvR7ZOiE&t=940s



const express = require('express');
const cors = require('cors');
const res = require('express/lib/response');

const app = express();


// third party library which actually return middleware.
app.use(cors());
// built-in middleware
app.use(express.json());


const middleWare1 = (req, res, next) => {
        console.log(`This is middleWare 1 from`);
        // if we put at to the next, it will be understood as an error, so express will stop going next &
        //  send the string inside next as the response.
        next();
};


const errorMiddleware = (req, res, next) => {
        throw new Error('This is custom error');
};




// application level middleware, will be executed for every request coming to application.
app.use(middleWare1);


const admin = express.Router();


const logger = (req, res, next) => {
        console.log(`${new Date().toLocaleDateString()}`);
        next();
};

// Router level middleware
admin.use(logger);

admin.get('/dashboard', (req, res) => {
        res.send('Welcom to admin panel');
});


app.use('/admin', admin);

// custom middleware
// here we want to define out middleware according to a configuration
// but regular middleware just recieve 3 parameter, so to resolve our condition, here we first write a 
// funciton, then return the middleware from there.
const middleware3 = (config) => (req, res, next) => {
        if(config.log) {
                console.log(`${req.method}`);
                next();
        } else {
                throw new Error('Failed to log the method');
        }
};
// pass parameter for defining middleware according to that
app.use(middleware3({log: true}));



app.use('/error', errorMiddleware);

// error handling middleware, as we can see it has extra parameter, 'err' at first, which seprate this from 
// regular middleware, we must have to give 4 parameter to tell express it is error handling middleware
const errorHandlingMiddleware = (err, req, res, next) => {
        console.log(err.message);
        res.status(500).send('500, Server side error');
};

// saying application to use the error handling middleware
app.use(errorHandlingMiddleware);





// if there have same path route has avaiable though like "app.get('/')", there has two same kind of
// this path, then both route will be called, but any middleware will call once.
// but somehow two same route call not executed in my test
const middleWare4 = (req, res, next) => {
        console.log('I am called once');
        next();
};

app.use(middleWare4);

// if there same two route, first one will be executed
app.get('/once', (req, res) => {
        console.log('Call from 1');
        res.end();
});

app.get('/once', (req, res) => {
        console.log('Call from 2');
        res.end();
});










app.get('/', (req, res) => {
        res.send('Welcome to the server');
});

app.listen(4000, () => {
        console.log('Server is running in port=4000...');
})
