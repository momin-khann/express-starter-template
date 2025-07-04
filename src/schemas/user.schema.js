import Joi from "joi";

export const userLoginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

export const userRegisterSchema = Joi.object({
  firstName: Joi.string().max(30),
  lastName: Joi.string().max(30),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});
