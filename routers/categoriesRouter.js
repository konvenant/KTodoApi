const express = require('express');
const router = express.Router();
const categoriesController = require("../controllers/categoriesController");

router.get("/categories/:username",categoriesController.getCategories);
router.delete("/category/:id/:name",categoriesController.deleteCategory);
router.post("/category", categoriesController.addCategory)

module.exports = router;