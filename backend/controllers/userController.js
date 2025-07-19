const User = require("../models/User");
const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
// registration controller
exports.register = async (req, res) => {
    const { username, email, password, role } = req.body;
    if (!username && !email && !password) {
        console.log(`all fields are required in register`);
        return res.status(400).json({ message: "all fields are required" })
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        console.log(`user exists`);
        return res.status(400).json({ message: "user exists" })
    }
    try {
        const newUser = new User({
            username, email, password, role
        });
        await newUser.save();
        res.status(201).json({ message: "registration successful" })
    } catch (error) {
        console.log("registration error : ", error.message);
        res.status(500).json({ message: error.message });
    }
}

// login controller

exports.login = async (req, res) => {
    const { email, password } = req.body;
    if (!email && !password) {
        console.log("all fields are required in login");
        return res.status(400).json({ message: "all feilds are required" });
    }
    try {
        const user = await User.findOne({ email });
        if (!user) {
            console.log("login error : user not found")
            return res.status(404).json({ message: "user is not find" })
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            console.log("login error : incorrect password")
            return res.status(400).json({ message: "incorrect password" })
        }

        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "20h" });
        res.json({ token, user: { id: user._id, username: user.username, role: user.role } })
    } catch (error) {
        console.log("login error : ", error.message);
        res.status(500).json({ message: error.message })
    }
}
// get a single user
exports.getUser = async (req, res) => {
    const id = req.params.id;
    try {
        const user = await User.findById(id);
        if (!user) {
            res.status(404).json({ message: "user not found" })
        }
        res.status(200).json({ id: user._id, username: user.username, email: user.email, role: user.role })
    } catch (error) {
        console.log("error in getuser : ", error.message);
        res.status(404).json({ message: "user found error" })
    }
}
// route to list of all users
exports.getUsers = async (req, res) => {
    try {

        const users = await User.find();
        res.status(200).json({ users })
    } catch (error) {
        console.log("get user error : ", error.message);

        res.status(500).json({ message: error.message })
    }
}

exports.deleteUser = async (req, res) => {
    const id = req.params.id;
    try {
        const user = await User.findByIdAndDelete(id);
        if (req.user.role !== "admin") {
            return res.status(403).json("access denied")
        }
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({
            message: "User deleted successfully",
            deletedUser: user,
        });
    } catch (error) {
        console.log("user delete error:", error.message);
        res.status(500).json({ message: error.message });
    }
};
