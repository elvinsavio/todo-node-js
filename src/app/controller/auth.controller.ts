import { Request, Response } from "express";
import db from "../model/model";
import encrypt from "../utils/encrypt";

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
          res.send("authorized");
        } else {
          res.status(401).send("Unauthorized");
        }
      })
      .catch((err) => {
        res.status(500).send(err.message);
      });
  },
};
