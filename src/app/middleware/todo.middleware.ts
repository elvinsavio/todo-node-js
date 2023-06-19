import { NextFunction, Request, Response } from "express";
import joiConfig from "../../config/joi.config";
import { createTodoScheme } from "../model/todo/todo.scheme";
import error from "../templates/error";

export default {
  createTodo: async (req: Request, res: Response, next: NextFunction) => {
    const { error: err } = createTodoScheme.validate(req.body, joiConfig);
    if (err) {
      error.errorMessage = err.message;
      return res.status(400).send(error);
    }
    return next();
  },
};
