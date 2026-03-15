const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

// ✅ FIXED: Async middleware-la 'next' parameter thevai illai
userSchema.pre('save', async function() {
    if (!this.isModified('password')) return;

    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        // next(); <-- Itha call panna koodathu, async function-la return panna pothum
    } catch (err) {
        throw err; // Error-ah throw panna auto-ah catch aagidum
    }
});

module.exports = mongoose.model('User', userSchema);