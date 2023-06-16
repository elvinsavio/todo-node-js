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
      response.data = users;
      res.send(response);
    });
  },

  getUserById: (req: Request, res: Response) => {
    db.User.findByPk(req.params.id)
      .then((user) => {
        if (user === null) throw new Error("User with id [" + req.params.id + "] not found");
        response.data = user;
        return res.send(response);
      })
      .catch((err) => {
        error.errorMessage = err;
        res.status(500).send(error);
      });
  },

  updateUser: (req: Request, res: Response) => {
    db.User.findByPk(req.params.id)
      .then((user) => {
        if (user === null) {
          throw new Error("User with id [" + req.params.id + "] not found");
        }
        user.update({
          email: req.body.email,
          password: req.body.password,
        });
        response.data = user;
        return res.send(response);
      })
      .catch((err) => {
        error.errorMessage = err;
        res.status(500).send(error);
      });
  },

  activateUser: (req: Request, res: Response) => {
    db.User.findByPk(req.params.id).then((user) => {
      if (user === null) {
        throw new Error("User with id [" + req.params.id + "] not found");
      }
      if (user.active) {
        throw new Error("User with id [" + req.params.id + "] already active");
      }
      user.update({
        active: true,
      });
      response.data = user;
      return res.send(response);
    });
  },

  deactivateUser: (req: Request, res: Response) => {
    db.User.findByPk(req.params.id).then((user) => {
      if (user === null) {
        throw new Error("User with id [" + req.params.id + "] not found");
      }
      if (!user.active) {
        throw new Error("User with id [" + req.params.id + "] already deactivated");
      }
      user.update({
        active: false,
      });
      response.data = user;
      return res.send(response);
    });
  },
};
