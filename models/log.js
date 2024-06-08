const mongoose = require('mongoose');

const LogSchema = new mongoose.Schema({
    log_id: { type: Number, required: true, unique: true }, // Primary Key
    user_id: { type: Number, required: true }, // Foreign Key from Users
    content: { type: String, required: true }, // Content of the log
    date: { type: Date, required: true }, // Date of the log
    created_at: { type: Date, default: Date.now } // Creation date of the log
});

// Export the model
module.exports = mongoose.model('Log', LogSchema);