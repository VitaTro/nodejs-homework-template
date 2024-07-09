const app = require("./app");
const mongoose = require("mongoose");
require("dotenv").config();

mongoose.Promise = global.Promise;

const MAIN_PORT = process.env.PORT || 5000;
const DB_URL = process.env.DB_URL;

mongoose.set("strictQuery", false);

const connection = mongoose.connect(DB_URL);

connection
  .then(() => {
    app.listen(MAIN_PORT, () => {
      console.log(`Server running. Use our API on port: ${MAIN_PORT}`);
    });
  })
  .catch((err) => {
    console.log(`Server not running. Error message: ${err.message}`);
    process.exit();
  });
