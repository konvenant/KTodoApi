const express = require('express');
const router = express.Router();
const userController = require("../controllers/userController");


router.post("/login",userController.login);
router.post("/signup",userController.signUp);
router.put("/password", userController.changePassword);
router.post("/getUsername",userController.getUserName);
router.post("/checkUserFavoriteColor",userController.getUserFavColor);


module.exports = router;