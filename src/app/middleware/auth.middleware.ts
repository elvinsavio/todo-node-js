import { NextFunction, Request, Response } from "express";

import error from "../templates/error";
import jwt from "../utils/jwt";

export default {
  signin(req: Request, res: Response, next: NextFunction) {
    if (!req.body.email || !req.body.password) {
      error.errorMessage = "Missing email or password";
      return res.status(400).send(error);
    }
    return next();
  },

  async verifyToken(req: Request, res: Response, next: NextFunction) {
    // check if token is there
    if (!req.headers.authorization) {
      error.errorMessage = "Missing authorization header";
      return res.status(401).send(error);
    }
    return jwt
      .verify(req.headers.authorization)
      .then((res) => {
        req.body.userObject = res.payload;
        return next();
      })
      .catch((err) => {
        error.errorMessage = err.message;
        return res.status(401).send(error);
      });
  },
};
