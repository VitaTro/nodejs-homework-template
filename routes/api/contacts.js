const express = require("express");

const router = express.Router();

const contacts = [];

router.get("/api/contacts", async (req, res, next) => {
  // res.json({ message: "template message" });
  try {
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/:contactId", async (req, res, next) => {
  res.json({ message: "template message" });
});

router.post("/", async (req, res, next) => {
  res.json({ message: "template message" });
});

router.delete("/:contactId", async (req, res, next) => {
  res.json({ message: "template message" });
});

router.put("/:contactId", async (req, res, next) => {
  res.json({ message: "template message" });
});

module.exports = router;
