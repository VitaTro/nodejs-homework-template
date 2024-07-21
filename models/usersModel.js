const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const users = new Schema({
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },
  subscription: {
    type: String,
    enum: ["starter", "pro", "business"],
    default: "starter",
  },
  token: {
    type: String,
    required: true,
    ref: "User",
  },
  avatarURL: {
    type: String,
    required: true,
  },
});
// Додавання методів до схеми користувача
users.methods.setPassword = function (password) {
  this.password = bcrypt.hashSync(password, bcrypt.genSaltSync(6));
};

users.methods.validPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};
// "user" - це перший аргумент методу і вказує на назву моделі. В даному випадку модель називається “user”.
// users - це другий аргумент методу і вказує на схему, за якою буде створена модель. Схема users визначена раніше в коді.
const User = mongoose.model("user", users);

module.exports = User;
