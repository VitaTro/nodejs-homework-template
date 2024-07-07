import { User } from "../schemas/users";
export const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.sendStatus(204);
  }
  const accessToken = authHeader.split(" ")[1];
  const checkIfListUser = await User.findOne({ token: accessToken });
  if (!checkIfListUser) {
    return res.json({ message: "Unauthorized" });
  }
  // якщо користувач існує, то зберігаю його дані
  req.User = checkIfListUser;
  next();
};
