import Quiz, { Answer, QnA } from "../../interfaces/quiz";
import prisma from "../../lib/prisma";
import { genSalt, hash } from "bcrypt";

export default class DataUtils {
  static async findUserByEmail(email: string) {
    try {
      const user = await prisma.users.findUnique({
        where: {
          email: email,
        },
      });

      return user;
    } catch (err) {
      throw err;
    }
  }

  static async bcryptHash(password: string) {
    try {
      const salt = await genSalt(10);
      const hashedPassword = await hash(password, salt);

      return hashedPassword;
    } catch (err) {
      throw err;
    }
  }

  static forgeCreationDate(years: number) {
    const creationDate = new Date(
      new Date().valueOf() - Math.random() * (1000 * 60 * 60 * 24 * 365 * years) // Up to years prior
    );

    return creationDate;
  }

  static async generateQuiz(client: any, quiz: Quiz) {
    try {
      const newQuiz = client.quizzes.create({
        data: {
          id: quiz.id ? quiz.id : undefined,
          userID: quiz.userID,
          title: quiz.title,
          qCount: quiz.qnas!.length,
          dateCreated: quiz.dateCreated ? quiz.dateCreated : undefined,
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

    const qnas: QnA[] = quiz.qnas!;
    for (let i = 0; i < qnas.length; i++) {
      const newQnA: QnA = await this.generateQnA(client, qnas[i], newQuiz.id!);

      const answers: Answer[] = qnas[i].answers;
      for (let j = 0; j < answers.length; j++) {
        await this.generateAnswer(client, answers[j], newQnA.id!);
      }
    }

    return newQuiz;
  }

  static async deleteAll(client: any) {
    await client.users.deleteMany({});
  }
}
