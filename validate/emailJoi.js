const Joi = require("joi");

// приймає тількт один параметр для валідації
const emailJoi = Joi.object({
  email: Joi.string().email({ minDomainSegments: 2 }).required(),
});

// Middleware для валідації
const emailJoiValidate = (req, res, next) => {
  const { error } = emailJoi.validate(req.body);
  if (error) {
    return res.status(400).json({
      status: "error",
      code: 400,
      message: error.details[0].message,
    });
  }
  next();
};
module.exports = emailJoiValidate;
