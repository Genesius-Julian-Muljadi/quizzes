import { NextFunction, Request } from "express";
import prisma from "../../lib/prisma";
import Quiz, { Answer, QnA } from "../../interfaces/quiz";
import QuizUtils from "./utils";

export default class QuizServices {
  static async createQuiz(req: Request, next: NextFunction) {
    try {
      const quiz = req.body.quiz as Quiz;

      let newQuiz: Quiz;
      await prisma.$transaction(async (prisma) => {
        newQuiz = await QuizUtils.generateEntireQuiz(prisma, quiz);
      });

      return newQuiz!;
    } catch (err) {
      next(err);
    }
  }

  static async editQuiz(req: Request, next: NextFunction) {
    try {
      const newQuiz = req.body.quiz as Quiz; // Quiz should contain current quizID
      await QuizUtils.validateFindQuizID(newQuiz.id);

      await prisma.$transaction(async (prisma) => {
        await QuizUtils.deleteQuiz(prisma, newQuiz.id!);
        await QuizUtils.generateEntireQuiz(prisma, newQuiz);
      });

      return newQuiz;
    } catch (err) {
      next(err);
    }
  }

  static async removeQuiz(req: Request, next: NextFunction) {
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
    }
  }
}
