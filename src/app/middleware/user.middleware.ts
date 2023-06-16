import joiConfig from "../../config/joi.config";

import type { Request, Response } from "express";
import { createUserSchema } from "../model/user/user.schema";

import error from "../templates/error";

export default {
  createUser(req: Request, res: Response, next: () => void) {
    const { error: err } = createUserSchema.validate(req.body, joiConfig);
    if (err) {
      error.errorMessage = err.message;
      return res.status(400).send(error);
    }
    next();
  },

  updateUser(req: Request, res: Response, next: () => void) {
    const { error: errBody } = createUserSchema.validate(req.body, joiConfig);
    if (errBody) {
      error.errorMessage = errBody.message;
      return res.status(400).send(error);
    }
    next();
  },
};
