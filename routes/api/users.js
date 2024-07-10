const express = require("express");
const router = express.Router();
const userController = require("../../controller/usersController");
const authMiddleware = require("../../validate/userMiddleware");
const { userJoiValidate } = require("../../validate/userJoi");

// authMiddleware використовується для автентифікації.
// userJoiValidate використовується для валідації даних користувача.
router.post("/signup", userJoiValidate, userController.signUp);
router.post("/login", userJoiValidate, authMiddleware, userController.logIn);
router.get("/logout", authMiddleware, userController.logOut);
router.get("/current", authMiddleware, userController.current);

module.exports = router;
