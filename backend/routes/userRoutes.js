const express = require("express");
const { register, login, getUsers, getUser, deleteUser } = require('../controllers/userController');
const { authorize, authorizeRoles } = require("../middlewares/authMiddleware");
const router = express.Router();

// POST /register
router.get("/getusers", authorize, authorizeRoles("admin"), getUsers)
router.get("/:id", authorize, getUser)
router.post("/register", register);
router.post("/login", login);
router.delete("/:id", authorize, authorizeRoles("admin"), deleteUser)
module.exports = router;
