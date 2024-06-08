const mongoose = require('mongoose');
const TodoSchema = new mongoose.Schema({
    todo_id: { type: Number, required: true, unique: true },
    user_id: { type: Number, required: true }, // Foreign Key from Users
    title: { type: String, required: true, maxlength: 100 },
    description: { type: String, required: true },
    due_date: { type: Date, required: true },
    priority: { type: Number, required: true },
    completed: { type: Boolean, default: false },
    created_at: { type: Date, default: Date.now } // Creation date of the log
});
module.exports = mongoose.model('Todo', TodoSchema);
