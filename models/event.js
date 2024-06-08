const mongoose = require('mongoose');
const EventSchema = new mongoose.Schema({
    event_id: { type: Number, required: true, unique: true },
    user_id: { type: Number, required: true }, // Foreign Key from Users
    title: { type: String, required: true, maxlength: 100 },
    description: { type: String, required: true },
    start_date: { type: Date, required: true },
    end_date: { type: Date, required: true },
    created_at: { type: Date, default: Date.now } // Creation date of the log
});
module.exports = mongoose.model('Event', EventSchema);
