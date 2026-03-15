const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// --- 1. Middleware ---
app.use(express.json()); 
app.use(cors()); 

// --- 2. Database Connection ---
const mongoURI = "mongodb://localhost:27017/truck_board"; 

mongoose.connect(mongoURI)
    .then(() => console.log("✅ MongoDB Connected Successfully!"))
    .catch((err) => console.log("❌ MongoDB Connection Error:", err));

// --- 3. Routes ---
const loadRoutes = require('./routes/loads');
const userRoutes = require('./routes/userRoutes'); // ✅ ADD THIS LINE

// Link the routes
app.use('/api/loads', loadRoutes); 
app.use('/api/users', userRoutes); // ✅ ADD THIS LINE - Ithu thaan Login/Signup-ku mookiyam

// Basic Home Route
app.get('/', (req, res) => {
    res.send("Truck Board Pro API is running...");
});

// --- 4. Server Start ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server is flying on port ${PORT}`);
});