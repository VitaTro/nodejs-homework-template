const User = require("../models/usersModel");
const { sendVerificationEmail } = require("../modules/email");

// повторне висилання мейла на верифікацію
const verificationEmailResend = async (req, res, next) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({
      status: "error",
      code: 400,
      message: "Missing required field email",
    });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        status: "error",
        code: 404,
        message: "User not found",
      });
    }
    if (user.verify) {
      return res.status(400).json({
        status: "error",
        code: 400,
        message: "Verification has already been passed",
      });
    }

    const verificationToken = user.verificationToken;
    await sendVerificationEmail(email, verificationToken);

    res.status(200).json({
      status: "success",
      code: 200,
      message: "Verification email sent",
    });
  } catch (error) {
    next(error);
  }
};

// верифікація користувача
const userVerification = async (req, res, next) => {
  try {
    const { verificationToken } = req.params;
    const user = await User.findOne({ verificationToken });

    if (!user) {
      return res.status(404).json({
        status: "error",
        code: 404,
        message: "User not found",
      });
    }

    user.verify = true; // користувач успішно пройшов іерифікацію
    user.verificationToken = null; // і тепер не треба більше верифікаційний токен (він видаляється)
    await user.save(); // зберігаються зміни в базі даних

    return res.status(200).json({
      status: "success",
      code: 200,
      message: "Verification successful",
    });
  } catch (error) {
    next(error);
  }
};
module.exports = { verificationEmailResend, userVerification };
