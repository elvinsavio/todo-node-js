import { NextFunction, Request, Response } from "express";

import error from "../templates/error";
import jwt from "../utils/jwt";
import response from "../templates/response";

export default {
  signin(req: Request, res: Response, next: NextFunction) {
    // check if email and password is there
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
    jwt
      .verify(req.headers.authorization)
      .then(() => {
        return next();
      })
      .catch((err) => {
        error.errorMessage = err.message;
        res.status(401).send(error);
      });
  },
};
