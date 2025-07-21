const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const morgan = require('morgan');
const dotenv = require('dotenv');
const { connectDB } = require('./config/db');
const userRoutes = require('./routes/userRoutes.js');
const bankRoutes = require("./routes/bankRoutes.js")
dotenv.config();
const app = express();
connectDB();
const allowedOrigins = [
    "http://localhost:5173",
    "https://bank-mgmnt-mhvats.onrender.com"
]
app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"))
        }
    }
}));
app.use(express.json());
app.use(morgan("dev"));

app.get("/", (req, res) => {
    res.send("working")
})

app.use("/api/auth", userRoutes)
app.use("/api/bank", bankRoutes)
app.listen(process.env.PORT, () => {
    console.log("server is running")
})