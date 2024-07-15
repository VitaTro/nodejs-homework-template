const jwt = require("jsonwebtoken");
const path = require("path");
const Jimp = require("jimp");
const fs = require("fs/promises");
const gravatar = require("gravatar");
const User = require("../models/usersModel");

const secret = process.env.SECRET;

// РЕЄСТРАЦІЯ

const signUp = async (req, res, next) => {
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
    // якщо новий користувач, додаємо йому можливість одразу уставити аватар
    newUser.avatarURL = gravatar.url(email);
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

//  ВХІД

const logIn = async (req, res, next) => {
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

    const token = jwt.sign(payload, secret);

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

// ДАНІ КОРИСТУВАЧА

const current = async (req, res, next) => {
  const { email, subscription } = req.user;
  res.json({
    code: 200,
    data: {
      email: email,
      subscription: subscription,
    },
  });
};

// ВИЛОГОВУВАННЯ
const logOut = async (req, res) => {
  try {
    // замість токена вкидаю id, щоб коли користувач вийшов з аппки, то мусив по новій логіниться

    // те,що зверху трохи неправильно. треба було вкинути таку логіку,щоб ноуд вишукував по id юзера,і коли він вилогується, то щоб токен анулювався
    const userId = req.user.id;
    await User.findByIdAndUpdate(userId, { token: null });
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

// ОНОВЛЕННЯ АВАТАРУ КОРИСТУВАЧА

// оголошення змінної для збереження шляху до директорії
const uploadDirname = path.join(__dirname, "../public/avatars");

const updateAvatar = async (req, res, next) => {
  const { userId } = req.user;
  const { path: tmpUpload, originalname } = req.file;

  try {
    const newAvatarName = `${userId}_${originalname}`;
    const outputPath = path.join(uploadDirname, newAvatarName);

    // Зменшення розміру картинки до 250x250
    const image = await Jimp.read(tmpUpload);
    await image.resize(250, 250).writeAsync(outputPath);

    // Якщо успішно, повернемо URL аватарки
    res.status(200).json({
      avatarURL: `/avatars/${newAvatarName}`,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const updateSubscription = async (req, res, next) => {
  try {
    const { subscription } = req.body;
    const userId = await User.findByIdAndUpdate(
      req.user.id,
      { subscription },
      { new: true }
    );
    if (!userId) {
      return res.status(404).json({
        status: "error",
        code: 404,
        message: "User not found",
      });
    }

    res.json({
      status: "sucsess",
      code: 200,
      data: {
        email: userId.email,
        subscription: userId.subscription,
      },
    });
  } catch (error) {
    next(error);
  }
};
module.exports = {
  signUp,
  logIn,
  current,
  logOut,
  updateAvatar,
  updateSubscription,
};
