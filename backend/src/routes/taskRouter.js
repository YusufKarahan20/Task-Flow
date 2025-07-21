const express = require("express");
const router = express.Router();
const taskController = require("../controllers/taskController");
const verifyUser = require("../middleware/verifyUser");

// Tüm task işlemleri için auth kontrolü
router.use(verifyUser);

router.post("/", taskController.createTask);
router.get("/", taskController.getTasksByUser);
router.delete("/:id", taskController.deleteTask);

module.exports = router;
