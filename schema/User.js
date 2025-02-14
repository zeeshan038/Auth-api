const Joi = require("joi");

// validation for signup
module.exports.signpSchema = (payload) => {
  const schema = Joi.object({
    name: Joi.string().required().messages({
      "string.empty": "Name is required.",
      "any.required": "Name is a mandatory field.",
    }),
    email: Joi.string().email().required().messages({
      "string.email": "Please provide a valid email address.",
      "string.empty": "Email is required.",
      "any.required": "Email is a mandatory field.",
    }),
    password: Joi.string().min(6).max(200).required().messages({
      "string.min": "Password must be at least 6 characters long.",
      "string.max": "Password cannot exceed 200 characters.",
      "string.empty": "Password is required.",
      "any.required": "Password is a mandatory field.",
    }),
    confirmPassword: Joi.string()
      .valid(Joi.ref("password"))
      .required()
      .messages({
        "any.only": "Passwords do not match.",
        "string.empty": "Confirm password is required.",
        "any.required": "Confirm password is a mandatory field.",
      }),
  }).unknown(false);
  const result = schema.validate(payload);
  return result;
};

//joi validation for login
module.exports.loginSchema = (payload) => {
  const schema = Joi.object({
    email: Joi.string().email().required().messages({
      "string.email": "Please provide a valid email address.",
      "string.empty": "Email is required.",
      "any.required": "Email is a mandatory field.",
    }),
    password: Joi.string().min(6).max(200).required().messages({
      "string.min": "Password must be at least 6 characters long.",
      "string.max": "Password cannot exceed 200 characters.",
      "string.empty": "Password is required.",
      "any.required": "Password is a mandatory field.",
    }),
  }).unknown(false);
  const result = schema.validate(payload);
  return result;
};
