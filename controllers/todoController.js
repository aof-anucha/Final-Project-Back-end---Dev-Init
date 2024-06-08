const Todo = require('../models/todo');

exports.getAllTodos = async (req, res) => {
    const todos = await Todo.find({ user_id: req.userId });
    res.json(todos);
};

exports.createTodo = async (req, res) => {
    const { title, description, due_date, priority } = req.body;
    console.log({ user_id: req.userId, title, description, due_date, priority })
    try {
        const todoCount = await Todo.countDocuments();
        const todo_id = todoCount + 1;

        const newTodo = new Todo({ todo_id, user_id: req.userId, title, description, due_date, priority });
        await newTodo.save();
        res.status(201).json(newTodo);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.getTodo = async (req, res) => {
    const todo = await Todo.findOne({ todo_id: req.params.id });
    if (todo && todo.user_id === req.userId) {
        res.json(todo);
    } else {
        res.status(404).send('Todo not found');
    }
};

exports.updateTodo = async (req, res) => {
    const { title, description, due_date, priority } = req.body;
    try {
        const todo = await Todo.findOneAndUpdate(
            { todo_id: req.params.id, user_id: req.userId },
            { title, description, due_date, priority },
            { new: true }
        );
        if (!todo) return res.status(404).json({ message: 'Todo not found' });
        res.json(todo);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.deleteTodo = async (req, res) => {
    try {
        const todo = await Todo.findOneAndDelete({ todo_id: req.params.id, user_id: req.userId });
        if (!todo) return res.status(404).json({ message: 'Todo not found' });
        res.json({ message: 'Event deleted' });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};