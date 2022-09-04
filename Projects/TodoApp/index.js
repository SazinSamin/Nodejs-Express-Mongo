// dependecies
import express, { json } from 'express';
import mongoose from 'mongoose';
import todoHandler from './routerHandler/todoHandler.js';

// app object
const app = express();

// return json data
app.use(json());

// mongodb database connection
mongoose.connect('mongodb://localhost/todos', {
}).then(() => {
        console.log('Database connection established');
}).catch(err => {
        console.log(err);
});


app.get('/', (req, res) => {
        res.status(200).send('Server is alive...');
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