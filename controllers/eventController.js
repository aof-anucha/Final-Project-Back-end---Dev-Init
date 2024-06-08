// controllers/eventController.js
const Event = require('../models/event');

exports.getAllEvents = async (req, res) => {
    const events = await Event.find({ user_id: req.userId });
    res.json(events);
};

exports.createEvent = async (req, res) => {
    const { title, description, start_date, end_date} = req.body;
    try {
        const eventCount = await Event.countDocuments();
        const event_id = eventCount + 1;

        const newEvent = new Event({ event_id, user_id: req.userId,  title, description, start_date, end_date });
        await newEvent.save();
        res.status(201).json(newEvent);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.getEvent = async (req, res) => {
    const event = await Event.findOne({ event_id: req.params.id });
    if (event && event.user_id === req.userId) {
        res.json(event);
    } else {
        res.status(404).send('Event not found');
    }
};


// exports.updateEvent = async (req, res) => {
//     const event = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
//     if (event && event.user.toString() === req.userId) {
//         res.json(event);
//     } else {
//         res.status(404).send('Event not found');
//     }
// };

exports.updateEvent = async (req, res) => {
    const { title, description, start_date, end_date} = req.body;
    try {
        const event = await Event.findOneAndUpdate(
            { event_id: req.params.id, user_id: req.userId },
            { title, description, start_date, end_date},
            { new: true }
        );
        if (!event) return res.status(404).json({ message: 'Event not found' });
        res.json(event);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

// exports.deleteEvent = async (req, res) => {
//     const event = await Event.findByIdAndDelete(req.params.id);
//     if (event && event.user.toString() === req.userId) {
//         res.send('Event deleted');
//     } else {
//         res.status(404).send('Event not found');
//     }
// };

exports.deleteEvent = async (req, res) => {
    try {
        const event = await Event.findOneAndDelete({ event_id: req.params.id, user_id: req.userId });
        if (!event) return res.status(404).json({ message: 'Event not found' });
        res.json({ message: 'Event deleted' });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};
