import { Request, Response } from "express";
import error from "../templates/error";
import response from "../templates/response";
import type { Todo } from "@prisma/client";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

function constructTodo(todo: Todo) {
  return {
    id: todo.id,
    title: todo.title,
    status: todo.status,
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
        // filter the todo into separate array
        const todo = todos.filter((todo) => todo.status === "todo");
        const doing = todos.filter((todo) => todo.status === "doing");
        const done = todos.filter((todo) => todo.status === "done");
        response.data = {
          todo: todo.map((todo) => constructTodo(todo)),
          doing: doing.map((todo) => constructTodo(todo)),
          done: done.map((todo) => constructTodo(todo)),
        };
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
          status: req.body.status,
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
