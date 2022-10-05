import mongoose from "mongoose";
import dataSchema from "./dataSchema.js";

// app module
const database = {};

// establishment of database connection
database.connectDatabase = async(req, res, next) => {
        try {
                await mongoose.connect('mongodb://localhost/test_prosthetics');
                console.log('Database connection established...');
                next();
        } catch (e) {
                next(e);
        }
}

// data collection model from database schema
database.collection = new mongoose.model('test_prosthetics', dataSchema);

// fetch data from server
database.fetch =  async () => {
       return await database.collection.find({})
}

// save data to the server
database.save = async (data, callback) => {
        const newData = new database.collection(data);
        await newData.save(err => {
                err ? callback(err) : callback('Data saved in database...');
        })
}

// export module
export default database;