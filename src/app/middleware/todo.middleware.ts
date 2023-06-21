import { NextFunction, Request, Response } from "express";
import joiConfig from "../../config/joi.config";
import { createTodoScheme, updateScheme } from "../schema/todo.scheme";
import error from "../templates/error";

export default {
  createTodo: (req: Request, res: Response, next: NextFunction) => {
    const { error: err } = createTodoScheme.validate(req.body, joiConfig);
    if (err) {
      error.errorMessage = err.message;
      return res.status(400).send(error);
    }
    return next();
  },

  updateTodo: (req: Request, res: Response, next: NextFunction) => {
    if (!req.params.id) {
      error.errorMessage = "Missing id";
      return res.send(error);
    }
    const { error: err } = updateScheme.validate(req.body, joiConfig);
    if (err) {
      error.errorMessage = err.message;
      return res.status(400).send(error);
    }
    return next();
  },
};
