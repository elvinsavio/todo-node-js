import joiConfig from "../../config/joi.config";

import type { Request, Response } from "express";
import { createUserSchema } from "../model/user/user.scema";

import error from "../templates/error";

export default {
  createUser(req: Request, res: Response, next: Function) {
    const { error: err } = createUserSchema.validate(req.body, joiConfig);
    if (err) {
      error.errorMessage = err.message;
      return res.status(400).send(error);
    }
    next();
  },
};
