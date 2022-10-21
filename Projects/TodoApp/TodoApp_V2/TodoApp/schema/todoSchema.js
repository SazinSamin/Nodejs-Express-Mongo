import mongoose  from "mongoose";
import utilities from "../helper/utilities.js";

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
                type: String,
                default: utilities.getDateTime(),
        }
});

export default todoSchema;