import { Request, Response, NextFunction } from "express";
import { getScore, setScore } from "..";

export async function resetScore(req: Request, res: Response, next: NextFunction) {
  setScore(0);
  next();
}