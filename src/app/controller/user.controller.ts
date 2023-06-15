import { Request, Response } from "express";
import db from "../model/model";

import response from "../templates/response";
import error from "../templates/error";
import { IUserModel } from "../model/user/user.type";

export default {
  createUser: (req: Request, res: Response) => {
    db.User.create({
      email: req.body.email,
      password: req.body.password,
    }).then((user: IUserModel) => {
      response.data = user;
      res.send(response);
    });
  },

  getAllUsers: (req: Request, res: Response) => {
    db.User.findAll().then((users) => {
      res.send(users);
    });
  },

  getUserById: (req: Request, res: Response) => {
    db.User.findByPk(req.params.id)
      .then((user) => {
        res.send(user);
      })
      .catch(() => {
        error.errorMessage = "User with id [" + req.params.id + "] not found";
        res.status(500).send(error);
      });
  },
};
