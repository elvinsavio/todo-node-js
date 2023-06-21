import e, { Request, Response } from "express";
import { PrismaClient, User } from "@prisma/client";
import response from "../templates/response";
import error from "../templates/error";
import encrypt from "../utils/encrypt";

const prisma = new PrismaClient();

const constructUser = (user: User) => {
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
    const password = await encrypt.cryptPassword(req.body.password);
    prisma.user
      .create({
        data: {
          email: req.body.email,
          password,
        },
      })
      .then((user) => {
        response.data = { user: constructUser(user) };
        return res.send(response);
      })
      .catch((err) => {
        error.errorMessage = err;
        res.status(500).send(error);
      });
  },

  getAllUsers: (req: Request, res: Response) => {
    prisma.user
      .findMany()
      .then((users) => {
        users.map((user) => {
          return constructUser(user);
        });
        response.data = { users };
        return res.send(response);
      })
      .catch((err) => {
        error.errorMessage = err;
        return res.status(500).send(error);
      });
  },

  getUserById: (req: Request, res: Response) => {
    prisma.user
      .findUnique({ where: { id: Number(req.params.id) } })
      .then((user) => {
        if (user === null) throw new Error("User not found");
        response.data = { user: constructUser(user) };
        res.send(response);
      })
      .catch((err) => {
        err.errorMessage = err;
        res.status(500).send(error);
      });
  },

  updateUser: async (req: Request, res: Response) => {
    const password = await encrypt.cryptPassword(req.body.password);

    prisma.user
      .update({
        where: { id: Number(req.params.id) },
        data: {
          password,
          active: req.body.active,
          updatedAt: new Date(),
        },
      })
      .then((user) => {
        if (user === null) throw new Error("User not found");
        response.data = { user: constructUser(user) };
        return res.send(response);
      })
      .catch((err) => {
        error.errorMessage = err;
        return res.status(500).send(error);
      });
  },
};
