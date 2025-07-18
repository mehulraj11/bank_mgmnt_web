const express = require("express");
const { register, login, getUsers, getUser } = require('../controllers/userController');
const { authorize, authorizeRoles } = require("../middlewares/authMiddleware");
const router = express.Router();

// POST /register
router.get("/getusers", authorize, authorizeRoles("admin"), getUsers)
router.get("/:id", authorize, authorizeRoles("admin"), getUser)
router.post("/register", register);
router.post("/login", login);
router.post("/adminlogin", login);
module.exports = router;
