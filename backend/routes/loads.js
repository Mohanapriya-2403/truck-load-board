const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');


const loadSchema = new mongoose.Schema({
    origin: String,
    destination: String,
    weight: Number,
    pallets: Number,
    price: Number,
    postedBy: String,
  
    status: { type: String, default: 'available' },
   
    bookedBy: { type: String, default: '' }
});

const Load = mongoose.models.Load || mongoose.model('Load', loadSchema);


router.get('/all', async (req, res) => {
    try {
        const loads = await Load.find();
        res.json(loads);
    } catch (err) { 
        res.status(500).json({ message: "Error fetching loads", error: err.message }); 
    }
});


router.post('/add', async (req, res) => {
    try {
        // Ensuring new loads start as 'available'
        const loadData = { ...req.body, status: 'available' };
        const newLoad = new Load(loadData);
        await newLoad.save();
        res.json(newLoad);
    } catch (err) { 
        res.status(500).json({ message: "Error adding load", error: err.message }); 
    }
});


router.put('/book/:id', async (req, res) => {
    try {
        const updatedLoad = await Load.findByIdAndUpdate(
            req.params.id,
            { 
                status: 'booked', 
                bookedBy: req.body.bookedBy 
            },
            { new: true }
        );

        if (!updatedLoad) {
            return res.status(404).json({ message: "Load not found" });
        }

        res.json(updatedLoad);
    } catch (err) {
        res.status(500).json({ message: "Booking process failed", error: err.message });
    }
});


router.delete('/delete/:id', async (req, res) => {
    try {
        const deletedLoad = await Load.findByIdAndDelete(req.params.id);
        if (!deletedLoad) {
            return res.status(404).json({ message: "Load not found" });
        }
        res.json({ message: "Load removed successfully" });
    } catch (err) { 
        res.status(500).json({ message: "Error deleting load", error: err.message }); 
    }
});


router.delete('/clear-all', async (req, res) => {
    try {
        const result = await Load.deleteMany({});
        res.json({ 
            message: "All shipments cleared!", 
            count: result.deletedCount 
        });
    } catch (err) { 
        res.status(500).json({ message: "Error clearing database", error: err.message }); 
    }
});

module.exports = router;