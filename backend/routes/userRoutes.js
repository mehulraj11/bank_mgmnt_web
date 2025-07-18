const express = require("express");
const { register } = require('../controllers/userController');
const router = express.Router();

// POST /register
router.post("/register", register);

module.exports = router;
