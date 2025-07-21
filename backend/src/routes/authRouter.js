const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const verifyUser = require("../middleware/verifyUser");

router.post("/register", authController.register);
// “me” endpoint’ine erişim için token kontrolü ekliyoruz
router.get("/me", verifyUser, authController.me);

module.exports = router;
