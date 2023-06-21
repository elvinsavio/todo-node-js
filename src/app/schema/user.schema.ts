import joi from "joi";

export const createUserSchema = joi.object().keys({
  email: joi.string().required(),
  password: joi.string().required(),
});
