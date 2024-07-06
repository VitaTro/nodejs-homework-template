import { User } from "../schemas/users";

// реєстрація
export const signUp = async (req, res, next) => {
  const { username, email, password } = res.body;
  const user = await User.findOne({ email }).lean();
  // якщо такий мейл є вже зареєстрований, то помилка 409
  if (user) {
    return res.status(409).json({
      status: "error",
      code: 409,
      message: "Email is already in use",
      data: "Conflict",
    });
  }
  // якщо ні, то реєструємо 201
  try {
    const newUser = new User({ username, email });
    newUser.setPassword(password);
    await newUser.save();
    res.status(201).json({
      status: "success",
      code: 201,
      data: {
        name: {
          email: email,
          subscription: "starter",
        },
      },
    });
  } catch (error) {
    next(error);
  }
};
