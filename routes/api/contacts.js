const express = require("express");
const router = express.Router();
const contactsController = require("../../controller/contactsController");
const authMiddleware = require("../../validate/userMiddleware");

// даю валідацію, яка відповідає за те,чи користувач взагалі має доступ до списку контактів
// тобто authMiddleware перед усіма справджає, а вже потім інші функції можуть працювати
router.get("/", authMiddleware, contactsController.get);

router.get("/:id", authMiddleware, contactsController.getById);

router.post("/", authMiddleware, contactsController.create);

router.delete("/:id", authMiddleware, contactsController.removeById);

router.put("/:id", authMiddleware, contactsController.update);

router.patch("/:id/favorite", authMiddleware, contactsController.updateStatus);

module.exports = router;
