const express = require("express");
const logger = require("morgan");
const cors = require("cors");

const router = require("./api/index");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";
app.use(express.json());
app.use(cors());

// const routerApi = require("./api");
// app.use("/api", routerApi);

app.use(logger(formatsLogger));
// app.use(cors());
// app.use(express.json());

app.use("/api/index", router);

// app.use((req, res, next) => {
//   res.status(404).json({ message: "Not found" });
// });

// app.use((err, req, res, next) => {
//   if (err.message === "Contact not found") {
//     res.status(404).json({ message: "Not found" });
//   } else {
//     res.status(500).json({ message: err.message });
//   }
// });
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
