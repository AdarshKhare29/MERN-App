import mongoose from "mongoose";

const ApplicationSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    jobTitle: {
        type: String,
        required: true
    },
    company: {
        type: String,
        required: true
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


export default mongoose.model("Application", ApplicationSchema);