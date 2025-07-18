const User = require("../models/User");
const mongoose = require("mongoose")

// registration controller
exports.register = async (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        console.log(`all fields are required`);
        return res.status(404).json({ message: "all fields are required" })
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        console.log(`user exists`);
        return res.status(400).json({ message: "user exists" })
    }
    try {
        const newUser = new User({
            username, email, password
        });
        await newUser.save();
        res.status(201).json({ message: "registration successful" })
    } catch (error) {
        console.log("registration error : ", error.message);
        res.status(500).json({ message: error.message });
    }
}