"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.quizValidator = quizValidator;
function checkQuestionHasCorrectAnswer(qna) {
    let questionHasCorrectAnswer = false;
    const answers = qna.answers;
    for (let i = 0; i < answers.length; i++) {
        if (answers[i].correct) {
            questionHasCorrectAnswer = true;
            break;
        }
    }
    return questionHasCorrectAnswer;
}
function quizValidator(quiz) {
    if (!quiz.qnas || quiz.qnas.length < 1)
        return false;
    let allQuestionsHaveACorrectAnswer = true;
    const qnas = quiz.qnas;
    for (let i = 0; i < qnas.length; i++) {
        if (!checkQuestionHasCorrectAnswer(qnas[i])) {
            allQuestionsHaveACorrectAnswer = false;
            break;
        }
    }
    return allQuestionsHaveACorrectAnswer;
}
