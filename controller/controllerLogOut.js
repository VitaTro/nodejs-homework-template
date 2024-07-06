import { ListUser } from "../schemas/listUserSchema";

export const logOut = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    const accessToken = authHeader.split(" ")[1];
    const newListUser = new ListUser({
      token: accessToken,
    });
    await newListUser.save();
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
