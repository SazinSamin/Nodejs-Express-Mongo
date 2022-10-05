import express from "express";
import database from "../database/databaseHandler.js";


// Router object
const userRoute =  express.Router();

// middleware for database connection establishment
userRoute.use(database.connectDatabase);

// handle get request and send database data
userRoute.get('/', async (req, res) => {
        const fectchedData = await database.fetch();
        console.log(fectchedData);
        res.status(200).send(fectchedData);
});

// handle post request and save the data to the database
userRoute.post('/', (req, res) => {
        
        database.save(req.body, (err) => {
                err ? res.status(400).send(err.message) :
                        res.status(500).send('Post successfull');
        });
});

// export module
export default userRoute;

