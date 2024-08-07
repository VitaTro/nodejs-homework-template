const jwt = require("jsonwebtoken");
const path = require("path");
const Jimp = require("jimp");
const fs = require("fs/promises");
const gravatar = require("gravatar");
const User = require("../models/usersModel");
require("dotenv").config();
const secret = process.env.SECRET;
const { v4: uuid4 } = require("uuid");
const sendVerificationEmail = require("../email");

// РЕЄСТРАЦІЯ

const signUp = async (req, res, next) => {
  const { email, password } = req.body;
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

  // додаю нове правило при реєстрації (обов'язкове проходження верифікації)
  const verificationToken = uuid4();

  // якщо ні, то реєструємо 201
  try {
    const newUser = new User({
      email,
      verificationToken,
      verify: false,
    });
    newUser.setPassword(password);
    // якщо новий користувач, додаємо йому можливість одразу уставити аватар
    newUser.avatarURL = gravatar.url(email);
    await newUser.save();

    // відправка електронного листа
    await sendVerificationEmail(email, verificationToken);

    res.status(201).json({
      status: "success",
      code: 201,
      data: {
        name: {
          email: email,
          subscription: newUser.subscription,
        },
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "error",
      code: 500,
      message: "Failed to send verification email",
    });
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

    // додаю перевірку, чи користувач пройшов верифікацію мейла, чи ні
    if (!user.verify) {
      return res.status(403).json({
        status: "error",
        code: 403,
        message: "Email not verified",
      });
    }

    const payload = {
      id: user._id,
      email: user.email,
    };

    const token = jwt.sign(payload, secret);
    user.token = token;
    await user.save();
    res.json({
      token,
      status: "success",
      code: 200,
      data: {
        user: {
          email: user.email,
          subscription: user.subscription,
          avatarURL: user.avatarURL,
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
      status: "success",
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
