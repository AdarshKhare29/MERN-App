import mongoose from "mongoose";

const ApplicationSchema = new mongoose.Schema({
    jobTitle: {
        type: String,
        required: true
    },
    company: {
        type: String,
        required: true,
        unique: true
    },
    location: {
        type: String,
        required: true
    },
    salary: {
        type: Number
    },
    applicationDate: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    notes: {
        type: String
    }
});

export default mongoose.model("Appplication", ApplicationSchema);