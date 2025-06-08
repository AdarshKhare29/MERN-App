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

export default router;