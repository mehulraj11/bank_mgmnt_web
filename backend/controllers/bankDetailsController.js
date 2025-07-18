const Bank = require("../models/Bank");


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
            ifscCode, branchName, bankName, accountNumber, accountHolderName
        });
        await holder.save();
        res.status(201).json({ message: "holder created", holder })
    } catch (error) {
        res.status(500).json({ message: "Server error" });

    }
}