const app = require("./app");
// const express = require("express");
// const app = express();

app.get("/", (req, res) => {
  res.send("My list contacts");
});
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running. Use our API on port: ${PORT}`);
});
