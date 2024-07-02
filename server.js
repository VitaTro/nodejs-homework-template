const express = require("express");
// const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");

const app = express();

// app.use(express.json());
// app.use(cors());

// const routerApi = require("./api");
// app.use("/api", routerApi);

// app.use((_, res, __) => {
//   res.status(404).json({
//     status: "error",
//     code: 404,
//     message: "Use api on routes: /api/contacts",
//     data: "Not found",
//   });
// });

// app.use((err, _, res, __) => {
//   console.log(err.contacts);
//   res.status(500).json({
//     status: "fail",
//     code: 500,
//     message: err.message,
//     data: "Internal Server Error",
//   });
// });

const MAIN_PORT = process.env.PORT || 5000;
const DB_URL = process.env.DB_URL;

mongoose
  .connect(DB_URL)
  .then(() => {
    app.listen(MAIN_PORT, () => {
      console.log(`Server running. Use our API on port: ${MAIN_PORT}`);
    });
  })
  .catch((err) => {
    console.error(`Error connecting to MongoDB: ${err.message}`);
  });
