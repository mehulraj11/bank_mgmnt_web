const mongoose = require("mongoose");

const bankSchema = mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    ifscCode: { type: String, required: true },
    branchName: { type: String, required: true },
    bankName: { type: String, required: true, enum: ["SBI", "KOTAK", "BOI", "RBI", "HDFC", "AXIS", "PNB", "PAYTM"] },
    accountNumber: { type: Number, unique: true, required: true },
    accountHolderName: { type: String, required: true }
})

module.exports = mongoose.model("Bank", bankSchema);