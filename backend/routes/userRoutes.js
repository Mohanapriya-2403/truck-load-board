const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// --- 1. SIGNUP ROUTE ---
router.post('/signup', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Validation
        if (!name || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Email check
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: "User already exists with this email" });
        }

        // ✅ IMPORTANT: Direct-ah password-ah anuppunga. 
        // User.js-la ulla 'pre-save' hook hashing-ah pathukkum.
        const newUser = new User({ name, email, password });
        await newUser.save();

        res.status(201).json({ message: "User registered successfully!" });
    } catch (err) {
        console.error("Signup Backend Error:", err);
        res.status(500).json({ message: err.message });
    }
});

// --- 2. LOGIN ROUTE ---
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: "Invalid Email or Password" });
        }

        // Match hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid Email or Password" });
        }

        const token = jwt.sign({ id: user._id }, "your_secret_key", { expiresIn: '1d' });

        res.status(200).json({ token, name: user.name });
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;