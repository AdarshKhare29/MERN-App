import express from "express";
import Application from "../modal/application.js";

const router = express.Router();

// Add Application
router.post("/addApplication", async (req, res) => {
    const {
        company,
        jobTitle,
        location,
        salary,
        applicationDate,
        status,
        notes,
        url
    } = req.body;
    console.log("inside add apllication", req.body);

    try {
        const existingUser = await Application.findOne({
            company
        });
        if (existingUser)
            return res.status(400).json({
                message: "Application already exists with same company"
            });


        const newApplication = new Application({
            company,
            jobTitle,
            location,
            salary,
            applicationDate,
            status,
            notes,
            url
        });
        await newApplication.save();


        res.status(201).json({
            application: {
                id: newApplication._id,
                company: newApplication.company,
                jobTitle: newApplication.jobTitle,
                location: newApplication.location,
                applicationDate: newApplication.applicationDate,
                notes: newApplication.notes,
                salary: newApplication.salary,
                status: newApplication.status,
                url: newApplication.url
                // etc.
            },
            message: "Application registered successfully",
        });
    } catch (error) {
        console.error("Registration error:", error);
        res.status(500).json({
            message: "Server error"
        });
    }
});

// Get all applications
router.get("/all", async (req, res) => {
    try {
        const applications = await Application.find()
        res.status(200).json({
            applications
        });
    } catch (error) {
        console.error("Fetch error:", error);
        res.status(500).json({
            message: "Failed to fetch applications"
        });
    }
});


export default router;