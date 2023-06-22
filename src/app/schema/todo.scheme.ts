import joi from "joi";

export const createTodoScheme = joi.object({
  title: joi.string().required(),
  description: joi.string().optional().allow("", null),
  endDate: joi.date().optional().allow("", null),
  userObject: joi.object(),
});

export const updateScheme = joi.object({
  status: joi.valid("todo", "doing", "done").required(),
  userObject: joi.object(),
});
