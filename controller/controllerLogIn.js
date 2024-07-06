import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { User } from "../schemas/users";

dotenv.config();
const secret = process.env.SECRET;

// вхід зарейестрованого користувача
export const logIn = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  // якщо не той юзер або не пройшов валідацію, то помилка 400
  try {
    if (!user || !user.validPassword(password)) {
      return res.status(400).json({
        status: "error",
        code: 400,
        message: "Incorrect login or password",
        data: "Bad request",
      });
    }
    const payload = {
      id: user.id,
      username: user.username,
    };
    // треба прости валідацію за 1 годину
    const token = jwt.sign(payload, secret, { expiresIn: "1h" });

    res.json({
      status: "success",
      code: 200,
      data: {
        token,
        user: {
          email: email,
          subscription: "starter",
        },
      },
    });
  } catch (error) {
    next(error);
  }
};
