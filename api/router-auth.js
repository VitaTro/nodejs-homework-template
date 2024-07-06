import express from "express";
import { current } from "../controller/controllerCurrent";
import { logIn } from "../controller/controllerLogIn";
import { logOut } from "../controller/controllerLogOut";
import { signUp } from "../controller/controllerSignUp";
import { authMiddleware } from "../validation/authMiddleware";
import { ValidateSchema } from "../validation/joi";

const router = express.Router();

// реєстрація
router.post("/signup", ValidateSchema, signUp);
// вхід
router.post("/login", ValidateSchema, logIn);
// вихід
router.get("/logout", authMiddleware, logOut);
// дані з токена
router.get("/current", authMiddleware, current);

export default router;
