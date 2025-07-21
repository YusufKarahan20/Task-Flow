const express = require("express");
const router = express.Router();
const statusController = require("../controllers/statusController");
const verifyUser = require("../middleware/verifyUser");

// Durumlar da sadece giriş yapmış kullanıcılar için
router.use(verifyUser);

router.get("/", statusController.getAllStatuses);

module.exports = router;
