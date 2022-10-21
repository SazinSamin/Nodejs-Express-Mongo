// dependecies
import express, { json } from 'express';
import mongoose from 'mongoose';
import todoHandler from './routerHandler/todoHandler.js';
import cors from 'cors';

// app object
const app = express();


// return json data
app.use(cors());
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


// async await database connection style
/*
userRoute.use( async (req, res, next) => {
        try {
                const database = await mongoose.connect('mongodb://localhost/todos');
                console.log('Database connection established...');
                next();
        } catch (e) {
                console.log(e);
        }
});
*/



app.get('/', (req, res) => {
        res.redirect('/todo');
})


// application route
app.use('/todo', todoHandler);


// default error handler
app.use((err, req, res, next) => {
        if(err) {
                res.status(500).send(`${err.message}`);
        }
})

// application listener
app.listen(3000, () => {
        console.log('Server is running on PORT=3000');
})
