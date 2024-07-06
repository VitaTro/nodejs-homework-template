const jwt = require("jsonwebtoken");

const payload = {
  id: 772255,
  username: "Vita",
};
const secret = "secret word";
// скільки буде у користувача часу, щоб перейти по тому токену (в даному випадку 1 годинy)
const token = jwt.sign(payload, secret, { expiresIn: "1h" });
console.log(token);
