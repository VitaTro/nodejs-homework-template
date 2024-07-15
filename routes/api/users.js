const express = require("express");
const router = express.Router();
const userController = require("../../controller/usersController");
const authMiddleware = require("../../validate/userMiddleware");
const {
  userJoiValidate,
  userSubscriptionJoi,
} = require("../../validate/userJoi");
const upload = require("../../validate/uploadMulter");

// authMiddleware використовується для автентифікації.
// userJoiValidate використовується для валідації даних користувача.
router.post("/signup", userJoiValidate, userController.signUp);
router.post("/login", userJoiValidate, authMiddleware, userController.logIn);
router.get("/logout", authMiddleware, userController.logOut);
router.get("/current", authMiddleware, userController.current);

// вибір, яку програму вибрав користувач
router.patch(
  "/",
  authMiddleware,
  userSubscriptionJoi,
  userController.updateSubscription
);
router.patch(
  "/avatars",
  authMiddleware,
  upload.single("avatar"),
  userController.updateAvatar
);

module.exports = router;
