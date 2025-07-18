const express = require("express");
const { register, login } = require('../controllers/userController');
const router = express.Router();

// POST /register
router.post("/register", register);
router.post("/login", login);
module.exports = router;
