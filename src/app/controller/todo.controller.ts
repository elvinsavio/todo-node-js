import { Request, Response } from "express";
import db from "../model/model";
import error from "../templates/error";
import response from "../templates/response";
import { ITodosModel } from "../model/todo/todo.type";

function createTodo(todo: ITodosModel) {
  return {
    id: todo.id,
    title: todo.title,
    description: todo.description,
    status: todo.status,
    endDate: todo.endDate,
  };
}

export default {
  createTodo: (req: Request, res: Response) => {
    db.Todo.create({
      title: req.body.title,
      description: req.body.description,
      userId: req.body.userObject.id,
      endDate: req.body.endDate,
    })
      .then((todo) => {
        res.send(createTodo(todo));
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
          todos: todos.map((todo) => createTodo(todo)),
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
          updatedAt: new Date(),
        });
        response.data = { todo: createTodo(todo) };
        return res.send(response);
      })
      .catch((err) => {
        error.errorMessage = err.message;
        return res.status(400).send(error);
      });
  },

  updateTodo: (req: Request, res: Response) => {
    db.Todo.findByPk(req.params.id).then((todo) => {
      if (todo === null) throw new Error("Todo with id [" + req.params.id + "] not found");
      todo.update({
        title: req.body.title,
        description: req.body.description,
        endDate: req.body.endDate,
        updatedAt: new Date(),
      });
      response.data = { todo: createTodo(todo) };
      return res.send(response);
    });
  },
};
