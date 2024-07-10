const passport = require("passport");

const authMiddleware = async (req, res, next) => {
  return passport.authenticate("jwt", { session: "false" }, (error, user) => {
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
module.exports = authMiddleware;
