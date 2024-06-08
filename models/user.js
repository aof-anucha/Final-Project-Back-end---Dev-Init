const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    user_id: { type: Number, required: true, unique: true },  // Primary Key/
    username: { type: String, required: true, unique: true, maxlength: 50 }, // User's username
    password: { type: String, required: true, maxlength: 255 }, // Hashed password
    email: { type: String, required: true, unique: true, maxlength: 100 }, // User's email
    created_at: { type: Date, default: Date.now }, // Account creation date
    last_login: { type: Date } // Last login date
});

// Export the model
module.exports = mongoose.model('User', UserSchema);

