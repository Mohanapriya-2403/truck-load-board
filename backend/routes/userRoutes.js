const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


router.post('/signup', async (req, res) => {
    try {
        const { name, email, password } = req.body;

       
        if (!name || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

       
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: "User already exists with this email" });
        }

        
        const newUser = new User({ name, email, password });
        await newUser.save();

        res.status(201).json({ message: "User registered successfully!" });
    } catch (err) {
        console.error("Signup Backend Error:", err);
        res.status(500).json({ message: err.message });
    }
});


router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: "Invalid Email or Password" });
        }

        
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