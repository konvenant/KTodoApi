const express = require('express');
const router = express.Router();
const todoController = require("../controllers/todoController");

router.get("/todo/:username/:category",todoController.getTodos);
router.delete("/todo/:id", todoController.deleteTodo);
router.post("/todo", todoController.addTodo)
router.put("/todo",todoController.updateTodo);

module.exports = router;