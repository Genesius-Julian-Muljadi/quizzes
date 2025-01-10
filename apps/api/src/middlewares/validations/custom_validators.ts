import Quiz, { Answer, QnA } from "../../interfaces/quiz";
import {
  Create_Answer,
  Create_QnA,
  Create_Quiz,
} from "../../interfaces/quiz_creation";

function checkQuestionHasCorrectAnswer(qna: QnA): boolean {
  let questionHasCorrectAnswer: boolean = false;
  const answers: Answer[] = qna.answers;

  for (let i = 0; i < answers.length; i++) {
    if (answers[i].correct) {
      questionHasCorrectAnswer = true;
      break;
    }
  }

  return questionHasCorrectAnswer;
}

export function quizValidator(quiz: Quiz): boolean {
  if (!quiz.qnas || quiz.qnas.length < 1) return false;

  let allQuestionsHaveACorrectAnswer: boolean = true;

  const qnas: QnA[] = quiz.qnas;
  for (let i = 0; i < qnas.length; i++) {
    if (!checkQuestionHasCorrectAnswer(qnas[i])) {
      allQuestionsHaveACorrectAnswer = false;
      break;
    }
  }

  return allQuestionsHaveACorrectAnswer;
}

function checkCreateQuestionHasCorrectAnswer(qna: Create_QnA): boolean {
  let questionHasCorrectAnswer: boolean = false;
  const answers: Create_Answer[] = qna.answers;

  for (let i = 0; i < answers.length; i++) {
    if (answers[i].correct === "true") {
      questionHasCorrectAnswer = true;
      break;
    }
  }

  return questionHasCorrectAnswer;
}

export function createQuizValidator(quiz: Create_Quiz): boolean {
  let allQuestionsHaveACorrectAnswer: boolean = true;

  const qnas: Create_QnA[] = quiz.qnas;
  for (let i = 0; i < qnas.length; i++) {
    if (!checkCreateQuestionHasCorrectAnswer(qnas[i])) {
      allQuestionsHaveACorrectAnswer = false;
      break;
    }
  }

  return allQuestionsHaveACorrectAnswer;
}

export function createQuizEmpty(quiz: Create_Quiz): boolean {
  if (!quiz.qnas || quiz.qnas.length < 1) return false;

  return true;
}
