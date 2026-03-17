const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();


app.use(express.json()); 
app.use(cors()); 


const mongoURI = "mongodb://localhost:27017/truck_board"; 

mongoose.connect(mongoURI)
    .then(() => console.log("✅ MongoDB Connected Successfully!"))
    .catch((err) => console.log("❌ MongoDB Connection Error:", err));


const loadRoutes = require('./routes/loads');
const userRoutes = require('./routes/userRoutes'); 


app.use('/api/loads', loadRoutes); 
app.use('/api/users', userRoutes); 


app.get('/', (req, res) => {
    res.send("Truck Board Pro API is running...");
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server is flying on port ${PORT}`);
});