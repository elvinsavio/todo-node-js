import { Request, Response } from "express";
import db from "../model/model";

import response from "../templates/response";

export default {
  createUser: (req: Request, res: Response) => {
    console.log(req.body);
    db.User.create({
      email: req.body.email,
      password: req.body.password,
    }).then((user: any) => {
      response.data = user;
      res.send(response);
    });
  },
  getAllUsers: (req: Request, res: Response) => {
    db.User.findAll().then((users: any) => {
      res.send(users);
    });
  },
};
