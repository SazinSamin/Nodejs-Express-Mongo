// dependecies
import express, { json } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

// app object
const app = express();


// return json data
app.use(cors());
app.use(json());
app.use(express.urlencoded({extended: true}));



import mongoose  from "mongoose";

const todoSchema =  mongoose.Schema({
        title: {
                type: String,
                required: true
        },
        description: String,
        status: {
                type: String,
                enum: ["active", "inactive"],
        },
        date: {
                type: Date,
                default: Date.now
        }
});

export default todoSchema;



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




// instantiate a route
const router = express.Router();

// create model for todoSchema
const Todo = new mongoose.model("Todo", todoSchema);


// Get all the todo
router.get('/', async (req, res) => {
        await Todo.find({})
                // exclude those filed
                .select('-_id -status -__v')
                .exec((err, docs) => {
                        err ?
                                res.status(500).json({err: err}) :
                                res.status(200).json({"Todos": docs});
                });
});

// Get id specifiq the todo
router.get('/:id', async (req, res) => {
        await Todo.findById(req.params.id)
                .select('-_id -status -__v')
                .exec((err, docs) => {
                        err ?
                                res.status(500).json({ err: err }) :
                                res.status(200).json({ "Todos": docs });
                });
});

// post a the todo
router.post('/', async (req, res) => {
        console.log(req.body);
        const newTodo = new Todo(req.body);
        await newTodo.save(err => {
                err ?
                        res.status(500).send(`Server side error: ${err}`) :
                        setTimeout(() => {
                                        res.redirect('http://127.0.0.1:5500/frontEnd/viewall.html');
                                }, 0)
        });
});

// post many todo
router.post('/all', async (req, res) => {
        await Todo.insertMany(req.body, err => {
                err ?
                        res.status(500).send(`Server side error: ${err}`) :
                        res.status(200).send('Todo saved in database');
        })
});

// update a todo
router.put('/:id', async (req, res) => {
        try {
                await Todo.updateOne(
                        { _id: req.params.id },
                        {
                                $set: {
                                        status: "Inactive",
                                }
                        },
                );
                res.status(200).send('Todo saved in database');
        } catch (err) {
                err ?
                        res.status(500).send(`Server side error: ${err}`) : '';
        }

});

// delete a todo
router.delete('/:id', async (req, res) => {
        await Todo.deleteOne({_id: req.params.id})
                .exec(err => {
                        err ?
                                res.status(500).json({err: err}) :
                                res.status(200).json({Todo: "Todo has successfully deleted"});
                });
});




export default router;

// application listener
app.listen(3000, () => {
        console.log('Server is running on PORT=3000');
})
