import { Request } from "express";
import prisma from "../../lib/prisma";
import { History } from "../../interfaces/quiz";
import QuizUtils from "./utils";
import { Create_Quiz } from "../../interfaces/quiz_creation";
import { Submit_Quiz } from "../../interfaces/quiz_submission";

export default class QuizServices {
  static async createQuiz(req: Request) {
    try {
      const quiz = req.body.quiz as Create_Quiz;
      const userID = req.params.id;

      let newQuiz: Create_Quiz;
      await prisma.$transaction(
        async (prisma) => {
          newQuiz = await QuizUtils.generateEntireQuiz(
            prisma,
            quiz,
            parseInt(userID)
          );
        },
        {
          maxWait: 5000,
          timeout: 900000,
        }
      );

      return newQuiz!;
    } catch (err) {
      throw err;
    }
  }

  static async editQuiz(req: Request) {
    try {
      const newQuiz = req.body.quiz as Create_Quiz;
      const quizID = req.params.id;
      const oldQuiz = await QuizUtils.validateFindQuizID(parseInt(quizID));

      await prisma.$transaction(
        async (prisma) => {
          await QuizUtils.deleteQuiz(prisma, parseInt(quizID));
          await QuizUtils.generateEntireQuiz(
            prisma,
            newQuiz,
            oldQuiz.userID!,
            oldQuiz.id,
            oldQuiz.dateCreated
          );
        },
        {
          maxWait: 5000,
          timeout: 900000,
        }
      );

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
      await prisma.$transaction(
        async (prisma) => {
          oldQuiz = await QuizUtils.deleteQuiz(prisma, parseInt(oldQuizID));
        },
        {
          maxWait: 5000,
          timeout: 900000,
        }
      );

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
      const userID = req.params.id ? req.params.id : undefined;
      const quizzes = await QuizUtils.findAllQuizzes(
        userID ? parseInt(userID) : undefined
      );

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
        correctQnAs,
        submittedQuiz
      );

      return { score: correctQnAs, record: newRecord };
    } catch (err) {
      throw err;
    }
  }

  static async getHistory(req: Request) {
    try {
      const userID = req.params.id;
      const quizzes = await QuizUtils.findHistory(parseInt(userID));

      return quizzes;
    } catch (err) {
      throw err;
    }
  }
}
