const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// 1. Schema Definition
// Ungaloda loads-kaka database structure
const loadSchema = new mongoose.Schema({
    origin: String,
    destination: String,
    weight: Number,
    pallets: Number,
    price: Number,
    postedBy: String,
    isBooked: { type: Boolean, default: false }
});

// 2. Model Creation
// 'Load' model-ah database kooda connect pannuthu
const Load = mongoose.models.Load || mongoose.model('Load', loadSchema);

// 3. API Endpoints

/** * @route   GET /api/loads/all
 * @desc    Fetch all shipments for the marketplace
 */
router.get('/all', async (req, res) => {
    try {
        const loads = await Load.find();
        res.json(loads);
    } catch (err) { 
        res.status(500).json({ message: "Error fetching loads", error: err.message }); 
    }
});

/** * @route   POST /api/loads/add
 * @desc    Create a new shipment
 */
router.post('/add', async (req, res) => {
    try {
        const newLoad = new Load(req.body);
        await newLoad.save();
        res.json(newLoad);
    } catch (err) { 
        res.status(500).json({ message: "Error adding load", error: err.message }); 
    }
});

/** * @route   PATCH /api/loads/book/:id
 * @desc    Mark a specific shipment as booked
 */
router.patch('/book/:id', async (req, res) => {
    try {
        const updated = await Load.findByIdAndUpdate(
            req.params.id, 
            { isBooked: true }, 
            { new: true }
        );
        res.json(updated);
    } catch (err) { 
        res.status(500).json({ message: "Error booking load", error: err.message }); 
    }
});

/** * @route   DELETE /api/loads/delete/:id
 * @desc    Delete a single shipment (owner only action)
 */
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

/** * @route   DELETE /api/loads/clear-all
 * @desc    Danger: Deletes every shipment in the database
 */
router.delete('/clear-all', async (req, res) => {
    try {
        // {} means match everything and delete
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