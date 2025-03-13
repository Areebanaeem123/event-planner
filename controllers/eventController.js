const Event = require("../models/Event");

exports.createEvent = async (req, res) => {
    const { name, description, date, category, reminder } = req.body;
    try {
        const event = new Event({ user: req.user.id, name, description, date, category, reminder });
        await event.save();
        res.json(event);
    } catch (err) {
        res.status(500).send("Server Error");
    }
};

exports.getEvents = async (req, res) => {
    try {
        const events = await Event.find({ user: req.user.id }).sort({ date: 1 });
        res.json(events);
    } catch (err) {
        res.status(500).send("Server Error");
    }
};
