import mongoose from "mongoose";
import utilities from "../utilities.js";

// database schema
const dataSchema = mongoose.Schema({
        charge: String,
        heart_rate : String,
        date: {
                type: String,
                default: utilities.currentTime()
        }
});

export default dataSchema;