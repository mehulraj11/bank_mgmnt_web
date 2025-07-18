const express = require("express");
const { authorize } = require("../middlewares/authMiddleware");
const { addDetails, getBanks } = require("../controllers/bankDetailsController");

const router = express.Router();

router.post("/add", authorize, addDetails)
router.get("/all", authorize, getBanks)

module.exports = router;