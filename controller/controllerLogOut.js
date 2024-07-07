import { User } from "../schemas/users";

export const logOut = async (req, res) => {
  try {
    const accessToken = req.headers.authorization.split(" ")[1];

    const newUser = new User({
      token: accessToken,
    });
    await newUser.save();
    res.status(200).json({
      message: "You are logged out!",
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      code: 500,
      message: "Internal Server Error",
    });
  }
};
