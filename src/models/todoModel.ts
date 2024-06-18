import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
    
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },

    title: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ["ToDo", "InProgress", "Completed"],
        required: true
    }
}, { timestamps: true })

export default mongoose.model('todos', todoSchema)