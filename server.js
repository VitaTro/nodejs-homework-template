const app = require("./app");

const port = 7123;
app.listen(port, () => {
  console.log(`Server running. Use our API on port: ${port}`);
});
