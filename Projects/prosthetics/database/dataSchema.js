/*
Name: Prosthetic Arm with sense server
Date: 05-09-2022
Author: Group-6, Capstone, EEE, UIU
*/


import mongoose from "mongoose";
import utilities from "../utilities.js";

// database schema
const dataSchema = mongoose.Schema({
        charge: String,
        temperature : String,
        pulse: String,
        oxygen: String,
        date: {
                type: String,
                default: (utilities.currentTime()).toString()
        }
});

export default dataSchema;