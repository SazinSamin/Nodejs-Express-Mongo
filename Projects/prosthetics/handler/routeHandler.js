/*
Name: Prosthetic Arm with sense server
Date: 05-09-2022
Author: Group-6, Capstone, EEE, UIU
*/

import express from "express";
import database from "../database/databaseHandler.js";


// Router object
const userRoute =  express.Router();

// middleware for database connection establishment
userRoute.use(database.connectDatabase);

// handle get request and send database data
userRoute.get('/', async (req, res) => {
        const fectchedData = await database.fetch();
        database.closeConnection();
        res.status(200).send(fectchedData);
});

// handle get request for fetching data 
userRoute.get('/single', async(req, res) => {
        const fectchedData = await database.fetchSingleData();
        database.closeConnection();
        res.status(200).send(fectchedData);
})

// handle post request and save the data to the database
userRoute.post('/', (req, res) => {
        database.save(req.body, (err) => {
                // console.log(err);
                database.closeConnection();
                err ? res.status(400).send(err.message) :
                        res.status(200).send('Date saved in the database');
        });
});

// export module
export default userRoute;

