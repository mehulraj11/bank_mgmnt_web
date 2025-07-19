const express = require("express");
const { authorize } = require("../middlewares/authMiddleware");
const { addDetails, getBanks } = require("../controllers/bankDetailsController");

const router = express.Router();

router.post("/add", authorize, addDetails)
router.get("/:id", authorize, getBanks)

module.exports = router;