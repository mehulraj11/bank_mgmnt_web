const express = require("express");
const  authorize  = require("../middlewares/authMiddleware");
const {addDetails} = require("../controllers/bankDetailsController");

const router = express.Router();

router.post("/add", authorize, addDetails)


module.exports = router;