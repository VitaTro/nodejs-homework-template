const passport = require("passport");
const User = require("../models/usersModel");

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.sendStatus(204);

  return passport.authenticate("jwt", { session: "false" }, (error, user) => {
    if (!user || error) {
      return res.status(401).json({
        status: "error",
        code: 401,
        message: "Unauthorized",
        data: "Unauthorized",
      });
    }
    req.user = User;
    next();
  })(req, res, next);
};
module.exports = authMiddleware;
