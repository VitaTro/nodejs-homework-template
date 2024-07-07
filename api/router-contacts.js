const express = require("express");
const router = express.Router();
const ctrlContact = require("../controller/contr-contacts");

router.get("/contacts", ctrlContact.get);
router.get("/contacts/:id", ctrlContact.getById);
router.post("/contacts", ctrlContact.create);
router.put("/contacts/:id", ctrlContact.update);
router.patch("/contacts/:contactId/favorite", ctrlContact.favorite);
router.delete("/contacts/:id", ctrlContact.remove);

module.exports = router;