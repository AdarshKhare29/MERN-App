import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../modal/user.js";

const router = express.Router();

// Register
router.post("/register", async (req, res) => {
  const {
    name,
    email,
    password
  } = req.body;
  console.log("inside register", req.body);

  try {
    const existingUser = await User.findOne({
      email
    });
    if (existingUser)
      return res.status(400).json({
        message: "User already exists"
      });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      email,
      password: hashedPassword
    });
    await newUser.save();

    const token = jwt.sign({
      id: newUser._id
    }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.status(201).json({
      token,
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email
      },
      message: "User registered successfully",
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({
      message: "Server error"
    });
  }
});

// Login
router.post("/login", async (req, res) => {
  const {
    email,
    password
  } = req.body;
  console.log("here in login", email, password)
  try {
    // Check if user exists
    const user = await User.findOne({
      email
    });
    if (!user) {
      console.log("User not found"); // Debugging
      return res.status(400).json({
        message: "User not found"
      });
    }

    // Check if password is correct
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log("Incorrect password"); // Debugging
      return res.status(400).json({
        message: "Invalid credentials"
      });
    }

    // Generate JWT token
    const token = jwt.sign({
      id: user._id
    }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      },
    });
  } catch (error) {
    console.error(error); // Debugging
    res.status(500).json({
      message: "Server error"
    });
  }
});

export default router;

// const Router = express.Router();

// Router.post("/login", async (req, res) => {
//   const {
//     userName,
//     password
//   } = req.body;
//   try {} catch (err) {}
// });