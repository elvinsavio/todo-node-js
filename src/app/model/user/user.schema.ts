import joi from "joi";

export const createUserSchema = joi.object().keys({
  email: joi.string().required(),
  password: joi.string().required(),
});

export const updateUserSchema = joi.object().keys({
  password: joi.string(),
  userObject: joi.object(),
});
