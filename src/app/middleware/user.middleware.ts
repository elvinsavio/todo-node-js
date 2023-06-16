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
    if (!req.params.id) {
      error.errorMessage = "Missing id";
      return res.send(error);
    }
    const { error: errBody } = createUserSchema.validate(req.body, joiConfig);
    if (errBody) {
      error.errorMessage = errBody.message;
      return res.status(400).send(error);
    }
    next();
  },

  /**
   * This function checks if the id is present in the request params.
   * If the id is not present, it will return an error response.
   * If the id is present, it will call the next middleware.
   */
  toggleActive(req: Request, res: Response, next: () => void) {
    if (!req.params.id) {
      error.errorMessage = "Missing id";
      return res.send(error);
    }
    next();
  },
};
