const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const verifyUser = require("../middleware/verifyUser");

// Sadece doğrulanmış kullanıcılar tüm kullanıcı listesini görebilsin
router.use(verifyUser);

router.get("/", userController.getAllUsers);

module.exports = router;
