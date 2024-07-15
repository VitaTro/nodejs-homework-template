const Joi = require("joi");

// приймає два параметри для валідації
const userJoi = Joi.object({
  password: Joi.string().min(8).max(16).required(),
  email: Joi.string().email({ minDomainSegments: 2 }).required(),
});

// додавткова валідація для вибору підписки(початковий, професійний, бізнес )
const subscriptionJoi = Joi.object({
  subscription: Joi.string().valid("starter", "pro", "business").required(),
});

const userSubscriptionJoi = (req, res, next) => {
  const { error } = subscriptionJoi.validate(req.body);
  if (error) {
    return res.status(400).json({
      status: "error",
      code: 400,
      message: error.details[0].message,
    });
  }
  next();
};
// перевірка валідації даних, які прийшли з HTTP-запиту
// якщо не відповідає дійсності, то помилка, а якщо так, то йдемо далі
const userJoiValidate = (req, res, next) => {
  const result = Joi.validate(req.body, userJoi);
  if (result.error) {
    const errorMessage = result.error.details
      .map((detail) => detail.message)
      .join(", ");
    res.status(400).json({ message: errorMessage });
  } else {
    next();
  }
};
module.exports = {
  userJoiValidate,
  userSubscriptionJoi,
};
