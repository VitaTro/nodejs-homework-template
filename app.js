const express = require("express");
const logger = require("morgan");
const cors = require("cors");

const router = require("./api/index");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";
app.use(express.json());
app.use(cors());

app.use(logger(formatsLogger));

app.use("/api/index", router);

app.use((_, res, __) => {
  res.status(404).json({
    status: "error",
    code: 404,
    message: "Use api on routes: /api/contacts",
    data: "Not found",
  });
});

app.use((err, _, res, __) => {
  console.log(err.contacts);
  res.status(500).json({
    status: "fail",
    code: 500,
    message: err.message,
    data: "Internal Server Error",
  });
});
module.exports = app;
