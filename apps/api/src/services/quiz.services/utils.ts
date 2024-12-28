import Quiz, { Answer, QnA } from "../../interfaces/quiz";
import prisma from "../../lib/prisma";

export default class QuizUtils {
  static async generateQuiz(client: any, quiz: Quiz) {
    try {
      const newQuiz = client.quizzes.create({
        data: {
          id: quiz.id ? quiz.id : undefined,
          title: quiz.title,
          qCount: quiz.qnas.length,
        },
      });

      return newQuiz;
    } catch (err) {
      throw err;
    }
  }

  static async generateQnA(client: any, qna: QnA, quizID: number) {
    try {
      const newQnA = client.quiz_QnA.create({
        data: {
          id: qna.id ? qna.id : undefined,
          quizID: quizID,
          question: qna.question,
          multiple: qna.multiple,
        },
      });

      return newQnA;
    } catch (err) {
      throw err;
    }
  }

  static async generateAnswer(client: any, answer: Answer, qnaID: number) {
    try {
      const newAnswer = client.quiz_Answers.create({
        data: {
          id: answer.id ? answer.id : undefined,
          qnaID: qnaID,
          answer: answer.answer,
          correct: answer.correct,
        },
      });

      return newAnswer;
    } catch (err) {
      throw err;
    }
  }

  static async generateEntireQuiz(client: any, quiz: Quiz) {
    const newQuiz = await this.generateQuiz(client, quiz);

    const qnas: QnA[] = quiz.qnas;
    for (let i = 0; i < qnas.length; i++) {
      const newQnA: QnA = await this.generateQnA(client, qnas[i], newQuiz.id!);

      const answers: Answer[] = qnas[i].answers;
      for (let j = 0; j < answers.length; j++) {
        await this.generateAnswer(client, answers[j], newQnA.id!);
      }
    }

    return newQuiz;
  }

  static async updateQuiz(client: any, quiz: Quiz, quizID: number) {
    try {
      const newQuiz = client.quizzes.update({
        data: {
          title: quiz.title,
          qCount: quiz.qnas.length,
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
      const newQnA = client.quiz_QnA.update({
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
      const newQnA = client.quiz_Answers.update({
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
      const deletedQuiz = client.quizzes.delete({
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
      const deletedQnA = client.quiz_QnA.delete({
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
      const deletedAnswer = client.quiz_Answers.delete({
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

      const findQuiz = prisma.quizzes.findUnique({
        where: {
          id: quizID,
        },
      });
      if (!findQuiz) throw new Error("Quiz ID not found!");

      return findQuiz;
    } catch (err) {
      throw err;
    }
  }
}
