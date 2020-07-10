const express = require("express");
const router = express.Router();

const authController = require("../controllers/auth");

// inscription utilisateur
router.post(
  "/signup",

  authController.signUp
);
//connection utilisateur
router.post(
  "/signin",

  authController.signIn
);

module.exports = router;
