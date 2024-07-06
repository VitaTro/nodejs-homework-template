import cors from "cors";
import express from "express";
import logger from "morgan";
import routerUsers from "./api/router-auth";
import routerContacts from "./api/router-contacts";
import { JWTStrategy } from "./config/config-passport";

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";
app.use(express.json());
app.use(cors());

app.use(logger(formatsLogger));

app.use("/api/index", routerContacts);

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

JWTStrategy();

app.use("/users", routerUsers);
app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});
app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});
export default app;
