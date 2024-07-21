const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  host: "smtp.mailgun.org",
  port: 587,
  secure: false,
  auth: {
    user: process.env.M_USER,
    pass: process.env.M_PASS,
  },
});

// висилання ГОЛОВНОГО листа верифікаційного
const sendVerificationEmail = async (email, verificationToken, next) => {
  const infoInEmail = {
    from: '"Your Service Test 👻" <your-email@example.com>',
    to: email,
    subject: "Verify your email",
    html: `<a href="http://localhost:${
      process.env.MAIN_PORT || 5000
    }/users/verify/${verificationToken}">Verify your email</a>`,
  };
  try {
    await transporter.sendMail(infoInEmail);
    console.log(`Verification email sent to ${email}`);
  } catch (error) {
    if (next) {
      next(error);
    } else {
      console.error(`Error sending email: ${error.message}`);
    }
  }
};

module.exports = {
  sendVerificationEmail,
};
