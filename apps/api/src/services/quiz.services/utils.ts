import Quiz, { Answer, QnA } from "../../interfaces/quiz";
import {
  Create_Answer,
  Create_QnA,
  Create_Quiz,
} from "../../interfaces/quiz_creation";
import { Submit_QnA, Submit_Quiz } from "../../interfaces/quiz_submission";
import prisma from "../../lib/prisma";

export default class QuizUtils {
  static async generateQuiz(
    client: any,
    quiz: Create_Quiz,
    userID: number,
    quizID?: number,
    dateCreated?: Date
  ) {
    try {
      const newQuiz = await client.quizzes.create({
        data: {
          id: quizID || undefined,
          userID: userID,
          title: quiz.title,
          qCount: quiz.qnas.length,
          dateCreated: dateCreated || undefined,
        },
      });

      return newQuiz;
    } catch (err) {
      throw err;
    }
  }

  static async generateQnA(client: any, qna: Create_QnA, quizID: number) {
    try {
      const newQnA = await client.quiz_QnA.create({
        data: {
          quizID: quizID,
          question: qna.question,
          multiple:
            qna.answers.filter((answer: Create_Answer) => {
              return answer.correct;
            }).length > 1,
        },
      });

      return newQnA;
    } catch (err) {
      throw err;
    }
  }

  static async generateAnswer(
    client: any,
    answer: Create_Answer,
    qnaID: number
  ) {
    try {
      const newAnswer = await client.quiz_Answers.create({
        data: {
          qnaID: qnaID,
          answer: answer.answer,
          correct: answer.correct === "true",
        },
      });

      return newAnswer;
    } catch (err) {
      throw err;
    }
  }

  static async generateEntireQuiz(
    client: any,
    quiz: Create_Quiz,
    userID: number,
    quizID?: number,
    dateCreated?: Date
  ) {
    try {
      const newQuiz = await this.generateQuiz(
        client,
        quiz,
        userID,
        quizID,
        dateCreated
      );

      const qnas: Create_QnA[] = quiz.qnas || [];
      for (let i = 0; i < qnas.length; i++) {
        const newQnA: QnA = await this.generateQnA(
          client,
          qnas[i],
          newQuiz.id!
        );

        const answers: Create_Answer[] = qnas[i].answers;
        for (let j = 0; j < answers.length; j++) {
          await this.generateAnswer(client, answers[j], newQnA.id!);
        }
      }

      return newQuiz;
    } catch (err) {
      throw err;
    }
  }

  static async updateQuiz(client: any, quiz: Quiz, quizID: number) {
    try {
      const newQuiz = await client.quizzes.update({
        data: {
          title: quiz.title,
          qCount: quiz.qnas?.length || -1,
        },
        where: {
          id: quizID,
        },
      });

      return newQuiz;
    } catch (err) {
      throw err;
    }
  }

  static async updateQnA(client: any, qna: QnA, qnaID: number) {
    try {
      const newQnA = await client.quiz_QnA.update({
        data: {
          question: qna.question,
          multiple: qna.multiple,
        },
        where: {
          id: qnaID,
        },
      });

      return newQnA;
    } catch (err) {
      throw err;
    }
  }

  static async updateAnswer(client: any, answer: Answer, answerID: number) {
    try {
      const newQnA = await client.quiz_Answers.update({
        data: {
          answer: answer.answer,
          correct: answer.correct,
        },
        where: {
          id: answerID,
        },
      });

      return newQnA;
    } catch (err) {
      throw err;
    }
  }

  static async deleteQuiz(client: any, quizID: number) {
    try {
      // This will not result in an error due to onDelete: Cascade in schema.prisma
      const deletedQuiz = await client.quizzes.delete({
        where: {
          id: quizID,
        },
      });

      return deletedQuiz;
    } catch (err) {
      throw err;
    }
  }

  static async deleteQnA(client: any, qnaID: number) {
    try {
      // This will not result in an error due to onDelete: Cascade in schema.prisma
      const deletedQnA = await client.quiz_QnA.delete({
        where: {
          id: qnaID,
        },
      });

      return deletedQnA;
    } catch (err) {
      throw err;
    }
  }

  static async deleteAnswer(client: any, answerID: number) {
    try {
      const deletedAnswer = await client.quiz_Answers.delete({
        where: {
          id: answerID,
        },
      });

      return deletedAnswer;
    } catch (err) {
      throw err;
    }
  }

  static async validateFindQuizID(quizID: any) {
    try {
      if (typeof quizID !== "number") throw new Error("Bad Quiz ID!");

      const findQuiz = await prisma.quizzes.findUnique({
        where: {
          id: quizID,
        },
        include: {
          qnas: {
            include: {
              answers: true,
            },
          },
        },
      });
      if (!findQuiz) throw new Error("Quiz ID not found!");

      return findQuiz;
    } catch (err) {
      throw err;
    }
  }

  static async findAllQuizzes(userID: number | undefined) {
    try {
      const findQuizzes = await prisma.quizzes.findMany({
        where: {
          userID: userID,
        },
        include: {
          qnas: {
            include: {
              answers: true,
            },
          },
        },
      });
      if (!findQuizzes) throw new Error("Unable to find quizzes");
      if (findQuizzes.length < 1) throw new Error("No quizzes available");

      return findQuizzes;
    } catch (err) {
      throw err;
    }
  }

  static sortAnswers(answers: string[]): string[] {
    return answers.sort(
      (answerID_1: string, answerID_2: string) =>
        parseInt(answerID_1) - parseInt(answerID_2)
    );
  }

  static evaluateQnA(submission: Submit_QnA, valuation: QnA): boolean {
    const correctAnswers: string[] = valuation.answers
      .filter((answer) => {
        return answer.correct;
      })
      .map((answer) => {
        return answer.id!.toString();
      });

    if (Array.isArray(submission.answers)) {
      const answerIDArray: string[] = submission.answers as string[];
      return (
        JSON.stringify(this.sortAnswers(correctAnswers)) ===
        JSON.stringify(this.sortAnswers(answerIDArray))
      );
    } else {
      const answerID: string = submission.answers as string;
      return correctAnswers.length === 1 && answerID === correctAnswers[0];
    }
  }

  static evaluateQuiz(submission: Submit_Quiz, valuation: Quiz): number {
    try {
      if (
        parseInt(submission.id) !== valuation.id ||
        submission.qnas.length !== valuation.qCount
      )
        throw new Error("Quizzes incompatible");

      let correctQnAs: number = 0;

      for (let k in submission.qnas) {
        if (this.evaluateQnA(submission.qnas[k], valuation.qnas![k]))
          correctQnAs++;
      }

      return correctQnAs;
    } catch (err) {
      throw err;
    }
  }

  static async recordQuiz(
    userID: number,
    quizID: number,
    score: number,
    submission: Submit_Quiz
  ) {
    try {
      let newRecord;
      await prisma.$transaction(async (prisma) => {
        newRecord = await prisma.quiz_History.create({
          data: {
            userID: userID,
            quizID: quizID,
            score: score,
            submission: JSON.stringify(submission),
          },
        });
      });

      if (!newRecord) throw new Error("Record quiz failed");
      return newRecord;
    } catch (err) {
      throw err;
    }
  }

  static async findHistory(userID: number) {
    try {
      const findQuizzes = await prisma.quiz_History.findMany({
        where: {
          userID: userID,
        },
      });
      if (!findQuizzes) throw new Error("Unable to find quizzes");

      return findQuizzes;
    } catch (err) {
      throw err;
    }
  }
}
