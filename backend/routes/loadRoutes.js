const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Schema & Model inside the route for simplicity
const loadSchema = new mongoose.Schema({
    origin: { type: String, required: true },
    destination: { type: String, required: true },
    weight: { type: Number, required: true },
    pallets: { type: Number, required: true },
    price: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now }
});

const Load = mongoose.model('Load', loadSchema);

// POST: http://localhost:5000/api/loads/add
router.post('/add', async (req, res) => {
    try {
        const newLoad = new Load(req.body);
        await newLoad.save();
        res.status(201).json(newLoad);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// GET: http://localhost:5000/api/loads/all
router.get('/all', async (req, res) => {
    try {
        const loads = await Load.find().sort({ createdAt: -1 });
        res.json(loads);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;