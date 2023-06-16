import { NextFunction, Request, Response } from "express";

import error from "../templates/error";

export default {
  signin(req: Request, res: Response, next: NextFunction) {
    // check if email and password is there
    if (!req.body.email || !req.body.password) {
      error.errorMessage = "Missing email or password";
      return res.status(400).send(error);
    }
    return next();
  },
};
