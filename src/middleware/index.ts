import { Request } from "express";

export default function (req: Request, res: Response, next: Function) {
  next();
}
