import passport from "passport";

import { ListUser } from "../schemas/listUserSchema";

export const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.sendStatus(204);
  const accessToken = authHeader.split(" ")[1];
  const checkIfListUser = await ListUser.findOne({ token: accessToken });
  if (checkIfListUser) return res.json({ message: "Not authorized" });
  passport.authenticate("jwt", { session: "false" }, (error, user) => {
    if (!user || error) {
      return res.status(401).json({
        status: "error",
        code: 401,
        message: "Unauthorized",
        data: "Unauthorized",
      });
    }
    req.user = user;
    next();
  })(req, res, next);
};
