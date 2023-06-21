import joi from "joi";

export const createTodoScheme = joi.object({
  title: joi.string().required(),
  description: joi.string().optional().allow("", null),
  endDate: joi.date().optional().allow("", null),
  userObject: joi.object(),
});

export const updateScheme = joi.object({
  status: joi.boolean().optional().allow("", null),
  completed: joi.boolean().optional().allow("", null),
  userObject: joi.object(),
});
