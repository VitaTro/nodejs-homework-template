require("dotenv").config();
require("passport");
require("./config/config-passport");
const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const devRoutes = require("./dev/dev");
const contactsRouter = require("./routes/api/contacts");
const usersRouter = require("./routes/api/users");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/users", usersRouter);
app.use("/api/contacts", contactsRouter);
app.use("/avatars", express.static("public/avatars"));

// коли я викликаю next() у функції контрольній, то коли не діють всі мої "якщо", то вивалює один з цих помилок
app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

module.exports = app;
