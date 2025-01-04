import { NextFunction, Request, Response } from "express";
import QuizServices from "../services/quiz.services/services";
import { History } from "../interfaces/quiz";

export default class QuizControllers {
  public async createQuiz(req: Request, res: Response, next: NextFunction) {
    try {
      const newQuiz = await QuizServices.createQuiz(req);

      res.status(201).send({
        message: "Quiz created!",
        data: newQuiz,
      });
    } catch (err) {
      next(err);
      res.status(401).send({
        message: String(err),
      });
    }
  }

  public async editQuiz(req: Request, res: Response, next: NextFunction) {
    try {
      const newQuiz = await QuizServices.editQuiz(req);

      res.status(200).send({
        message: "Quiz editted!",
        data: newQuiz,
      });
    } catch (err) {
      next(err);
      res.status(401).send({
        message: String(err),
      });
    }
  }

  public async removeQuiz(req: Request, res: Response, next: NextFunction) {
    try {
      const oldQuiz = await QuizServices.removeQuiz(req);

      res.status(200).send({
        message: "Quiz deleted!",
        data: oldQuiz,
      });
    } catch (err) {
      next(err);
      res.status(401).send({
        message: String(err),
      });
    }
  }

  public async getQuizByQuizID(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const quiz = await QuizServices.getQuizByQuizID(req);

      res.status(200).send({
        message: "Quiz retrieved!",
        data: quiz,
      });
    } catch (err) {
      next(err);
      res.status(401).send({
        message: String(err),
      });
    }
  }

  public async getAllQuizzes(req: Request, res: Response, next: NextFunction) {
    try {
      const quizzes = await QuizServices.getAllQuizzes(req);

      res.status(200).send({
        message: "Quizzes retrieved!",
        data: quizzes,
      });
    } catch (err) {
      next(err);
      res.status(401).send({
        message: String(err),
      });
    }
  }

  public async submitQuiz(req: Request, res: Response, next: NextFunction) {
    try {
      const evaluate_recordQuiz: { score: number; record: History } =
        await QuizServices.evaluate_recordQuiz(req);

      res.status(200).send({
        message: "Quiz submitted!",
        data: evaluate_recordQuiz,
      });
    } catch (err) {
      next(err);
      res.status(401).send({
        message: String(err),
      });
    }
  }
}
