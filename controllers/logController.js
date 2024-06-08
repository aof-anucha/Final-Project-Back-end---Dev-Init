// controllers/logController.js
const Log = require('../models/log');

exports.getAllLogs = async (req, res) => {
    const logs = await Log.find({ user_id: req.userId });
    res.json(logs);
};

exports.getLog = async (req, res) => {
    const log = await Log.findOne({ log_id: req.params.id });
    console.log(log)
    if (log && log.user_id === req.userId) {
        res.json(log);
    } else {
        res.status(404).send('Log not found');
    }
};

exports.createLog = async (req, res) => {
    const { content, date } = req.body;
    try {
        const logCount = await Log.countDocuments();
        const log_id = logCount + 1;

        const newLog = new Log({ log_id, user_id: req.userId, content, date });
        await newLog.save();
        res.status(201).json(newLog);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

// exports.updateLog = async (req, res) => {
//     const log = await Log.findByIdAndUpdate(req.params.id, req.body, { new: true });
//     if (log && log.user_id.toString() === req.userId) {
//         res.json(log);
//     } else {
//         res.status(404).send('Log not found');
//     }
// };

exports.updateLog = async (req, res) => {
    const { content, date } = req.body;
    try {
        const log = await Log.findOneAndUpdate(
            { log_id: req.params.id, user_id: req.userId },
            { content, date },
            { new: true }
        );
        if (!log) return res.status(404).json({ message: 'Log not found' });
        res.json(log);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.deleteLog = async (req, res) => {
    try {
        const log = await Log.findOneAndDelete({ log_id: req.params.id, user_id: req.userId });
        if (!log) return res.status(404).json({ message: 'Log not found' });
        res.json({ message: 'Log deleted' });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};
