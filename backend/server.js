const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const morgan = require('morgan');
const dotenv = require('dotenv');
const { connectDB } = require('./config/db');
const userRoutes = require('./routes/userRoutes.js');
dotenv.config();
const app = express();
connectDB();
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.get("/", (req, res) => {
    res.send("working")
})

app.use("/api/auth", userRoutes)
app.listen(process.env.PORT, () => {
    console.log("server is running")
})