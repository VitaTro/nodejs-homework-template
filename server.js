const express = require("express");

require("dotenv").config();
const mongoose = require("mongoose");

const app = express();

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
