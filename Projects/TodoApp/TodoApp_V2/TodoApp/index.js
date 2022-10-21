// dependecies
import express, { json } from 'express';
import mongoose from 'mongoose';
import todoHandler from './routerHandler/todoHandler.js';
import cors from 'cors';

// app object
const app = express();

// use cors policy
app.use(cors());
// return json data
app.use(json());
app.use(express.urlencoded({extended: true}));



// mongodb database connection
const callDatabase = (req, res, next) => {
        mongoose.connect('mongodb://localhost/todos', {
        }).then(() => {
                console.log('Database connection established');
                next();
        }).catch(err => {
                next(err);
        });
}

app.use(callDatabase);

/*
app.get('/', (req, res) => {
        // res.redirect('/todo');
});
*/


// application route
app.use('/', todoHandler);


// default error handler
app.use((err, req, res, next) => {
        if(err) {
                res.status(500).send(`${err.message}`);
        }
})

// application listener
app.listen(3000, () => {
        console.log('Server is running on 127.0.0.1:3000');
})