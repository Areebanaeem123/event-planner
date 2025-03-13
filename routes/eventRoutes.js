const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");

let events = []; // In-memory array to store events

// @desc Create a new event
// @route POST /api/events
// @access Private
router.post("/", protect, (req, res) => {
    const { name, description, date, time, category } = req.body;
    
    if (!name || !date || !time || !category) {
        return res.status(400).json({ message: "Please provide all event details" });
    }

    const newEvent = {
        id: events.length + 1,
        name,
        description,
        date,
        time,
        category,
        reminder: false
    };

    events.push(newEvent);
    res.status(201).json(newEvent);
});

// @desc Get all events (sorted by date)
// @route GET /api/events
// @access Private
router.get("/", protect, (req, res) => {
    const sortedEvents = events.sort((a, b) => new Date(a.date) - new Date(b.date));
    res.json(sortedEvents);
});

// @desc Update an event
// @route PUT /api/events/:id
// @access Private
router.put("/:id", protect, (req, res) => {
    const { id } = req.params;
    const { name, description, date, time, category, reminder } = req.body;

    const eventIndex = events.findIndex(event => event.id == id);
    if (eventIndex === -1) return res.status(404).json({ message: "Event not found" });

    events[eventIndex] = {
        ...events[eventIndex],
        name,
        description,
        date,
        time,
        category,
        reminder
    };

    res.json(events[eventIndex]);
});

// @desc Delete an event
// @route DELETE /api/events/:id
// @access Private
router.delete("/:id", protect, (req, res) => {
    const { id } = req.params;
    events = events.filter(event => event.id != id);
    res.json({ message: "Event deleted successfully" });
});

module.exports = router;
