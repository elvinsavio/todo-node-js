import { Request, Response } from "express";
import db from "../model/model";
import encrypt from "../utils/encrypt";
import jwt from "../utils/jwt";

import response from "../templates/response";
import error from "../templates/error";
export default {
  signin(req: Request, res: Response) {
    db.User.findOne({
      where: {
        email: req.body.email,
      },
    })
      .then(async (user) => {
        if (user === null) throw new Error("User not found");
        if (await encrypt.comparePassword(req.body.password, user?.password)) {
          const jwtToken = await jwt.sign({ id: user.id, email: user.email });
          response.data = { token: jwtToken };
          return res.send(response);
        }
        throw new Error("Unauthorized");
      })
      .catch((err) => {
        error.errorMessage = err.message;
        return res.status(500).send(error);
      });
  },
};
