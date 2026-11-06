import type { Request, Response, NextFunction } from "express";

export function validateToggleDone(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { isDone } = req.body;

  if (typeof isDone !== "boolean") {
    res.status(400).json({
      error: "Поле isDone обязательно и должно быть boolean (true/false)",
    });
    return;
  }

  next();
}