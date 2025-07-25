const mongoose = require('mongoose');

exports.connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("db connected");
    } catch (error) {
        console.log(`db error ${error.message}`);
    }
}