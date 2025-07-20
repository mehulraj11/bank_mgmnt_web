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
        console.log(`add bank POST error : ${error.message}`);

        res.status(500).json({ message: "Server error" });

    }
}
exports.getBank = async (req, res) => {
    const id = req.params.id;
    try {
        const user = await Bank.find({ user: id }).populate("user")
        // console.log("user", user);
        const bankData = await Bank.findById(id);
        const userBankData = await Bank.find({ user: id })
        // console.log(userBankData);

        // console.log("user", user);

        res.status(200).json({ bankData, user, userBankData })
    } catch (error) {
        console.log("Getting bank data error : ", error.message); ``
        res.status(500).json({ message: error.message })

    }
}
exports.getBanks = async (req, res) => {
    const id = req.user.id

    try {
        const data = await Bank.find({ user: id });
        const allBank = await Bank.find();
        res.status(200).json({ data, allBank })
    } catch (error) {
        console.log("get bank list error:", error.message);
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
exports.updateBank = async (req, res) => {
    try {
        const bankId = req.params.id;
        const updateFields = req.body;

        const allowedFields = [
            "accountNumber",
            "accountHolderName",
            "bankName",
            "branchName",
            "ifscCode",
        ];

        const updates = {};
        for (const key of allowedFields) {
            if (
                updateFields[key] !== undefined &&
                updateFields[key] !== null &&
                updateFields[key] !== ""
            ) {
                updates[key] = updateFields[key];
            }
        }

        if (Object.keys(updates).length === 0) {
            return res.status(400).json({ message: "No valid fields to update." });
        }

        const updatedBank = await Bank.findByIdAndUpdate(
            bankId,
            { $set: updates },
            { new: true }
        );

        if (!updatedBank) {
            return res.status(404).json({ message: "Bank not found" });
        }

        res.status(200).json(updatedBank);
    } catch (error) {
        console.error("Error updating bank:", error);
        res.status(500).json({ message: "Server error" });
    }
};
