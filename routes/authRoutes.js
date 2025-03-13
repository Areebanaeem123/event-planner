const express = require("express");
const jwt = require("jsonwebtoken");

const router = express.Router();

// Dummy user (No database needed)
const user = {
    id: 1,
    username: "admin",
    password: "password123"
};

// @desc Login user
// @route POST /api/auth/login
// @access Public
router.post("/login", (req, res) => {
    const { username, password } = req.body;

    if (username !== user.username || password !== user.password) {
        return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user.id }, "secretkey", { expiresIn: "1h" });
    res.json({ token });
});

module.exports = router;
