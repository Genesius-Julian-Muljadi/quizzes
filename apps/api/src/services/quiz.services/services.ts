import { NextFunction, Request, Response } from "express";
import prisma from "../../lib/prisma";
import Quiz, { Answer, QnA } from "../../interfaces/quiz";
import QuizUtils from "./utils";

export default class QuizServices {
  static async createQuiz(req: Request, res: Response, next: NextFunction) {
    try {
      const quiz = req.body.quiz as Quiz;
      const userID = req.params.id;

      let newQuiz: Quiz;
      await prisma.$transaction(async (prisma) => {
        newQuiz = await QuizUtils.generateEntireQuiz(
          prisma,
          quiz,
          parseInt(userID)
        );
      });

      return newQuiz!;
    } catch (err) {
      next(err);
      res.status(401).send({
        message: String(err),
      });
    }
  }

  static async editQuiz(req: Request, res: Response, next: NextFunction) {
    try {
      const newQuiz = req.body.quiz as Quiz; // Quiz should contain current quizID
      await QuizUtils.validateFindQuizID(newQuiz.id);

      await prisma.$transaction(async (prisma) => {
        await QuizUtils.deleteQuiz(prisma, newQuiz.id!);
        await QuizUtils.generateEntireQuiz(prisma, newQuiz, newQuiz.userID!);
      });

      return newQuiz;
    } catch (err) {
      next(err);
      res.status(401).send({
        message: String(err),
      });
    }
  }

  static async removeQuiz(req: Request, res: Response, next: NextFunction) {
    try {
      const oldQuizID = req.body.id as string;
      await QuizUtils.validateFindQuizID(parseInt(oldQuizID));

      let oldQuiz;
      await prisma.$transaction(async (prisma) => {
        oldQuiz = await QuizUtils.deleteQuiz(prisma, parseInt(oldQuizID));
      });

      return oldQuiz;
    } catch (err) {
      next(err);
      res.status(401).send({
        message: String(err),
      });
    }
  }

  static async getQuizByQuizID(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const quizID = req.params.id;
      const quiz = await QuizUtils.validateFindQuizID(parseInt(quizID));

      return quiz;
    } catch (err) {
      next(err);
      res.status(401).send({
        message: String(err),
      });
    }
  }
}
