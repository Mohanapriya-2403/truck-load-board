const express = require('express');
const router = express.Router();

// Dummy route for now to stop the error
router.post('/login', (req, res) => {
    res.json({ message: "Login logic here" });
});

router.post('/signup', (req, res) => {
    res.json({ message: "Signup logic here" });
});

module.exports = router;