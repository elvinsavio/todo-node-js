import { Request, Response } from "express";
import db from "../model/model";

import response from "../templates/response";
import error from "../templates/error";
import encrypt from "../utils/encrypt";

import type { IUserModel } from "../model/user/user.type";

/**
 * @description
 * This function takes a user object and returns a user object with only the
 * properties that we want to send to the client.
 */
const userObject = (user: IUserModel) => {
  return {
    id: user.id,
    email: user.email,
    active: user.active,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
};

export default {
  createUser: async (req: Request, res: Response) => {
    db.User.create({
      email: req.body.email,
      password: await encrypt.cryptPassword(req.body.password),
    })
      .then((user: IUserModel) => {
        response.data = { user: userObject(user) };
        res.send(response);
      })
      .catch((err) => {
        if (err.name === "SequelizeUniqueConstraintError") {
          error.errorMessage = "Email " + req.body.email + " already exists";
        } else {
          error.errorMessage = err;
        }
        return res.status(500).send(error);
      });
  },

  getAllUsers: (req: Request, res: Response) => {
    db.User.findAll().then((users) => {
      response.data = { users: users.map((user) => userObject(user)) };
      res.send(response);
    });
  },

  getUserById: (req: Request, res: Response) => {
    db.User.findByPk(req.params.id)
      .then((user) => {
        if (user === null) throw new Error("User with id [" + req.params.id + "] not found");
        response.data = { user: userObject(user) };
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
          updatedAt: new Date(),
        });
        response.data = { user };
        return res.send(response);
      })
      .catch((err) => {
        error.errorMessage = err;
        res.status(500).send(error);
      });
  },

  toggleUser: (req: Request, res: Response) => {
    db.User.findByPk(req.params.id).then((user) => {
      if (user === null) {
        throw new Error("User with id [" + req.params.id + "] not found");
      }
      user.update({
        active: !user.active,
        updatedAt: new Date(),
      });
      response.data = { user: userObject(user) };
      return res.send(response);
    });
  },
};
