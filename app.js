const express = require("express");
const logger = require("morgan");
const cors = require("cors");

const router = require("./api/index");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/api/index", router);

app.use((req, res, next) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  if (err.message === "Contact not found") {
    res.status(404).json({ message: "Not found" });
  } else {
    res.status(500).json({ message: err.message });
  }
});

module.exports = app;
