import express from "express";
import Application from "../modal/application.js";
import auth from "../middleware/auth.js";

const router = express.Router();

// Add Application
// Protect this route with auth middleware
router.post("/addApplication", auth, async (req, res) => {
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

    try {
        const existingUser = await Application.findOne({
            company,
            userId: req.user.id // ✅ filtered by user
        });

        if (existingUser) {
            return res.status(400).json({
                message: "Application already exists with same company"
            });
        }

        const newApplication = new Application({
            company,
            jobTitle,
            location,
            salary,
            applicationDate,
            status,
            notes,
            url,
            userId: req.user.id // ✅ assign user ID securely
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


// Get only current user's applications
router.get("/all", auth, async (req, res) => {
    try {
        const applications = await Application.find({
            userId: req.user.id
        });
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