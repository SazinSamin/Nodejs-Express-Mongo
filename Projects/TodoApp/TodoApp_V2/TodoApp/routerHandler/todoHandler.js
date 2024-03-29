// resolve dependencies
import express from "express";
import mongoose from "mongoose";
import todoSchema from "../schema/todoSchema.js";


// instantiate a route
const router = express.Router();

// create model for todoSchema
const Todo = new mongoose.model("Todo", todoSchema);

// Get all the todo
router.get('/', async (req, res) => {
        /*
        await Todo.find({}).then(docs => {
                res.status(500).json({
                        "All todos " : docs, 
                });
        }).catch(err => {
                res.json({
                        err: err
                });
        });*/
        await Todo.find({})
                // exclude those fields
                .select('-status -__v')
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
        /*
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
        }*/

        const idObj = {_id: req.params};
        console.log(req.params);
        /*
        try{
                await Todo.findOneAndUpdate()
        } catch(err) {
                err ?
                        res.status(500).send(`Server side error: ${err}`) : '';
        }
        */

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