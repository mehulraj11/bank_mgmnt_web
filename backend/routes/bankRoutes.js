const express = require("express");
const { authorize } = require("../middlewares/authMiddleware");
const { addDetails, getBanks, getBank, deleteBank, updateBank } = require("../controllers/bankDetailsController");

const router = express.Router();

router.post("/add", authorize, addDetails)
router.get("/all", authorize, getBanks)
router.get("/:id", authorize, getBank)
router.patch("/:id", updateBank)
router.delete("/:id", authorize, deleteBank)

module.exports = router;