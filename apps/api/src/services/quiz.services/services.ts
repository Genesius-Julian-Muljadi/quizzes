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
        newQuiz = await QuizUtils.generateQuiz(prisma, quiz);

        const qnas: QnA[] = quiz.qnas;
        for (let i = 0; i < qnas.length; i++) {
          const newQnA: QnA = await QuizUtils.generateQnA(
            prisma,
            qnas[i],
            newQuiz.id
          );

          const answers: Answer[] = qnas[i].answers;
          for (let j = 0; j < answers.length; j++) {
            await QuizUtils.generateAnswer(prisma, answers[j], newQnA.id);
          }
        }
      });

      return newQuiz!;
    } catch (err) {
      next(err);
    }
  }
}
