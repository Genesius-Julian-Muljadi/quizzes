import Quiz, { Answer, QnA } from "../../interfaces/quiz";

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
  if (quiz.qnas.length < 1) return false;

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
