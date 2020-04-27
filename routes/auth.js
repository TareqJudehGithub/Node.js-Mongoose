const authController = require("../controllers/auth");
const express = require("express");
const router = express.Router();

router.get("/login", authController.getLogin);
router.post("/login", authController.postLogin);
router.get("/signUp", authController.getSignUp);

module.exports = router;