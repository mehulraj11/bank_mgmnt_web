const express = require("express");
const { authorize } = require("../middlewares/authMiddleware");
const { addDetails, getBanks, getBank } = require("../controllers/bankDetailsController");

const router = express.Router();

router.post("/add", authorize, addDetails)
router.get("/all",authorize, getBank)
router.get("/:id", authorize, getBanks)

module.exports = router;