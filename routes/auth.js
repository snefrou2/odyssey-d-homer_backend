const express = require("express");
const router = express.Router();

const authController = require("../controllers/auth");

// post user
router.post("/", authController.postAuth);

router.get("/", authController.getAll);

module.exports = router;
