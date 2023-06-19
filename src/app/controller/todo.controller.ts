import { Request, Response } from "express";
import db from "../model/model";
import response from "../templates/response";

export default {
  createTodo: async (req: Request, res: Response) => {
    db.Todo.create({
      title: req.body.title,
      description: req.body.description,
      userId: req.body.userObject.id,
      endDate: req.body.endDate,
    })
      .then((todo) => {
        res.send(todo);
      })
      .catch((err) => {
        res.status(500).send(err);
      });
  },

  getTodos: async (req: Request, res: Response) => {
    db.Todo.findAll({
      where: {
        userId: req.body.userObject.id,
      },
    })
      .then((todos) => {
        response.data = {
          todos,
        };
        res.send(response);
      })
      .catch((err) => {
        res.status(500).send(err);
      });
  },
};
