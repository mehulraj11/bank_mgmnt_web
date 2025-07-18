const express = require("express");
const { register, login, getUsers } = require('../controllers/userController');
const { authorize, authorizeRoles } = require("../middlewares/authMiddleware");
const router = express.Router();

// POST /register
router.post("/register", register);
router.post("/login", login);
router.get("/getusers", authorize, authorizeRoles("admin"), getUsers)
module.exports = router;
