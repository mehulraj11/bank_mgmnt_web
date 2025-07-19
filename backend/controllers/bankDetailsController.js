const Bank = require("../models/Bank");
const User = require('../models/User');

exports.addDetails = async (req, res) => {
    const { ifscCode, branchName, bankName, accountNumber, accountHolderName } = req.body;
    if (!ifscCode && !branchName && !bankName && !accountNumber && !accountHolderName) {
        return res.status(400).json({ message: "all feilds are required in bank details" });
    }
    const existingHolder = await Bank.findOne({ accountNumber });
    if (existingHolder) {
        return res.status(400).json({ message: "holder already exists" });
    }
    try {
        const holder = new Bank({
            user: req.user.id, ifscCode, branchName, bankName, accountNumber, accountHolderName
        });
        await holder.save();
        res.status(201).json({ message: "holder created", holder })
    } catch (error) {
        res.status(500).json({ message: "Server error" });

    }
}
exports.getBank = async (req, res) => {
    const id = req.user.id;
    try {
        console.log(req.user);

        const bankData = await Bank.find({ user: id });
        console.log(bankData);

        res.status(200).json(bankData)
    } catch (error) {
        console.log("Getting bank data error : ", error.message);
        res.status(500).json({ message: error.message })

    }
}
exports.editDetails = async (req, res) => {
    const id = req.params.id;
    const updatedFields = req.body;

    try {
        const updatedBank = await Bank.findByIdAndUpdate(
            id,
            { $set: updatedFields },
            { new: true, runValidators: true }
        );

        if (!updatedBank) {
            return res.status(404).json({ message: "Bank detail not found." });
        }

        res.status(200).json({ message: "Bank detail updated.", updatedBank });
    } catch (error) {
        console.log("Edit error:", error.message);
        res.status(500).json({ message: error.message });
    }
};
exports.deleteBank = async (req, res) => {
    const id = req.params.id;

    try {
        const deletedBank = await Bank.findByIdAndDelete(id);

        if (!deletedBank) {
            return res.status(404).json({ message: "Bank detail not found." });
        }

        res.status(200).json({ message: "Bank detail deleted successfully.", deletedBank });
    } catch (error) {
        console.log("Delete error:", error.message);
        res.status(500).json({ message: error.message });
    }
};
// route to get all added banks into user's id
exports.getBanks = async (req, res) => {
    const id = req.params.id;

    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const bankList = await Bank.find({ user: id });
        res.status(200).json({
            user,
            bankList,
        });
    } catch (error) {
        console.log("get bank list error:", error.message);
        res.status(500).json({ message: error.message });
    }
};