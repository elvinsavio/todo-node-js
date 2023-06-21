import e, { Request, Response } from "express";
import error from "../templates/error";
import response from "../templates/response";
import type { Todo } from "@prisma/client";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

function constructTodo(todo: Todo) {
  return {
    id: todo.id,
    title: todo.title,
    completed: todo.completed,
    createdAt: todo.createdAt,
    updatedAt: todo.updatedAt,
  };
}

export default {
  createTodo: (req: Request, res: Response) => {
    prisma.todo
      .create({
        data: {
          title: req.body.title,
          completed: false,
          userId: req.body.userObject.id,
        },
      })
      .then((todo) => {
        response.data = constructTodo(todo);
        res.send(response);
      })
      .catch((err) => {
        error.errorMessage = err.message;
        res.status(500).send(error);
      });
  },

  getTodos: (req: Request, res: Response) => {
    prisma.todo
      .findMany({
        where: {
          userId: req.body.userObject.id,
        },
      })
      .then((todos) => {
        response.data = { todo: todos.map((todo) => constructTodo(todo)) };
        res.send(response);
      });
  },

  updateTodo: (req: Request, res: Response) => {
    prisma.todo
      .update({
        where: {
          id: Number(req.params.id),
        },
        data: {
          completed: req.body.completed,
          updatedAt: new Date(),
        },
      })
      .then((todo) => {
        response.data = { todo: constructTodo(todo) };
        res.send(response);
      })
      .catch((err) => {
        error.errorMessage = err.message;
        res.status(500).send(error);
      });
  },
};
