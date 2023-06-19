import { Request, Response } from "express";
import db from "../model/model";
import error from "../templates/error";
import response from "../templates/response";

export default {
  createTodo: (req: Request, res: Response) => {
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

  getTodos: (req: Request, res: Response) => {
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
        error.errorMessage = err.message;
        res.status(500).send(error);
      });
  },

  updateStatus: (req: Request, res: Response) => {
    db.Todo.findByPk(req.params.id)
      .then((todo) => {
        if (todo === null) throw new Error("Todo with id [" + req.params.id + "] not found");
        todo.update({
          status: req.body.status,
        });
        response.data = { todo };
        return res.send(response);
      })
      .catch((err) => {
        error.errorMessage = err.message;
        return res.status(400).send(error);
      });
  },
};
