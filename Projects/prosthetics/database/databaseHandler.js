/*
Name: Prosthetic Arm with sense server
Date: 05-09-2022
Author: Group-6, Capstone, EEE, UIU
*/

import mongoose from "mongoose";
import dataSchema from "./dataSchema.js";

// app module
const database = {};

// database address
// database.onlineDatabase = `mongodb+srv://sazinsamin:${process.env.databasePass}@cluster0.dduuimh.mongodb.net/prosthetics_data?retryWrites=true&w=majority`;
database.onlineDatabase = `mongodb+srv://sazinsamin:${process.env.databasePass}@cluster0.dduuimh.mongodb.net/prosthetics_data?retryWrites=true&w=majority`;
database.localDatabase = 'mongodb://localhost/test_prosthetics';


// establishment of database connection
database.connectDatabase = async(req, res, next) => {
        // primary selected database
        let selectedDatabase = database.localDatabase;
        // select database accroding to the environment variable
        if (process.env.selectDatabase == 'online') selectedDatabase = database.onlineDatabase;
        try {
                await mongoose.connect(selectedDatabase);
                console.log(`Database connection established to ${process.env.selectDatabase === undefined ? 'local' : process.env.selectDatabase}...`);
                next();
        } catch (e) {
                next(e);
        }
}

// close database connection
database.closeConnection = () => {
        mongoose.connection.close((err) => {
                err ? console.log('Connection cant close ') : console.log("Connection closed");
        });
}


// data collection model from database schema
database.collection = new mongoose.model('test_prosthetics', dataSchema);

// fetch data from server
database.fetch =  async () => {
       return await database.collection.find({});
}

// fetch single data from server
database.fetchSingleData = async () => {
        return await database.collection.findOne({}).sort({ field: 'asc', _id: -1 }).limit(1);
}

// save data to the server
database.save = async (data, callback) => {
        const newData = new database.collection(data);
        await newData.save(err => {
                err ? callback(err) : callback(null);
        })
}





// export module
export default database;