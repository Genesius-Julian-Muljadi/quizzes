import { NextFunction, Request, Response } from "express";
import QuizServices from "../services/quiz.services/services";

export default class QuizControllers {
  public async createQuiz(req: Request, res: Response, next: NextFunction) {
    try {
      const newQuiz = await QuizServices.createQuiz(req, next);

      res.status(200).send({
        message: "Quiz created!",
        data: newQuiz,
      });
    } catch (err) {
      next(err);
    }
  }
}
