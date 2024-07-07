import Joi from "joi";

// приймає два параметри (пошта і пароль)
const schema = Joi.object({
  email: Joi.string().email({ minDomainSegments: 2 }).required(),
  password: Joi.string().min(8).max(16).required(),
});

// перевірка валідації даних, які прийшли з HTTP-запиту
// якщо не відповідає дійсності, то помилка, а якщо так, то йдемо далі
export const validateAuthSchema = (req, res, next) => {
  const result = schema.validate(req.body);
  if (result.error) {
    res.status(400).json({ message: result.error.message });
  } else {
    next();
  }
};
