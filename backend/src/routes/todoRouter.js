const express = require("express");
const router = express.Router();
const todoController = require("../controllers/todoController");
const verifyUser = require("../middleware/verifyUser");

// To-do güncelleme de yalnızca doğrulanmış kullanıcılarca
router.use(verifyUser);

router.patch("/:id", todoController.updateTodo);

module.exports = router;
