import { Request } from "express";
import prisma from "../../lib/prisma";
import Quiz, { Answer, History, QnA } from "../../interfaces/quiz";
import QuizUtils from "./utils";
import { Submit_Quiz } from "../../interfaces/quiz_submission";

export default class QuizServices {
  static async createQuiz(req: Request) {
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
      throw err;
    }
  }

  static async editQuiz(req: Request) {
    try {
      const newQuiz = req.body.quiz as Quiz; // Quiz should contain current quizID
      const oldQuiz = await QuizUtils.validateFindQuizID(newQuiz.id);
      newQuiz.dateCreated = oldQuiz.dateCreated;
      newQuiz.userID = oldQuiz.userID;

      await prisma.$transaction(async (prisma) => {
        await QuizUtils.deleteQuiz(prisma, newQuiz.id!);
        await QuizUtils.generateEntireQuiz(prisma, newQuiz, newQuiz.userID!);
      });

      return newQuiz;
    } catch (err) {
      throw err;
    }
  }

  static async removeQuiz(req: Request) {
    try {
      const oldQuizID = req.body.id as string;
      await QuizUtils.validateFindQuizID(parseInt(oldQuizID));

      let oldQuiz;
      await prisma.$transaction(async (prisma) => {
        oldQuiz = await QuizUtils.deleteQuiz(prisma, parseInt(oldQuizID));
      });

      return oldQuiz;
    } catch (err) {
      throw err;
    }
  }

  static async getQuizByQuizID(req: Request) {
    try {
      const quizID = req.params.id;
      const quiz = await QuizUtils.validateFindQuizID(parseInt(quizID));

      return quiz;
    } catch (err) {
      throw err;
    }
  }

  static async getAllQuizzes(req: Request) {
    try {
      const quizzes = await QuizUtils.findAllQuizzes();

      return quizzes;
    } catch (err) {
      throw err;
    }
  }

  static async evaluate_recordQuiz(req: Request) {
    try {
      const submittedQuiz = req.body.quiz as Submit_Quiz;
      const userID = req.params.id;
      const valuationQuiz = await QuizUtils.validateFindQuizID(
        parseInt(submittedQuiz.id)
      );

      const correctQnAs: number = QuizUtils.evaluateQuiz(
        submittedQuiz,
        valuationQuiz
      );

      const newRecord: History = await QuizUtils.recordQuiz(
        parseInt(userID),
        parseInt(submittedQuiz.id),
        correctQnAs
      );

      return { score: correctQnAs, record: newRecord };
    } catch (err) {
      throw err;
    }
  }
}
