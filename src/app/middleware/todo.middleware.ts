import { NextFunction, Request, Response } from "express";
import joiConfig from "../../config/joi.config";
import { createTodoScheme, updateStatusScheme, updateTodoScheme } from "../model/todo/todo.scheme";
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

  updateStatus: (req: Request, res: Response, next: NextFunction) => {
    const { error: err } = updateStatusScheme.validate(req.body, joiConfig);
    if (err) {
      error.errorMessage = err.message;
      return res.status(400).send(error);
    }
    return next();
  },

  updateTodo: (req: Request, res: Response, next: NextFunction) => {
    const { error: err } = updateTodoScheme.validate(req.body, joiConfig);
    if (err) {
      error.errorMessage = err.message;
      return res.status(400).send(error);
    }
    return next();
  },
};
