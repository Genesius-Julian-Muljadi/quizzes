import Quiz, { Answer, QnA } from "../../interfaces/quiz";

export default class QuizUtils {
  static async generateQuiz(client: any, quiz: Quiz) {
    try {
      const newQuiz = client.quizzes.create({
        data: {
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
}
