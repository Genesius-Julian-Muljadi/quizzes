"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.quizValidator = quizValidator;
exports.createQuizValidator = createQuizValidator;
exports.createQuizEmpty = createQuizEmpty;
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
function checkCreateQuestionHasCorrectAnswer(qna) {
    let questionHasCorrectAnswer = false;
    const answers = qna.answers;
    for (let i = 0; i < answers.length; i++) {
        if (answers[i].correct === "true") {
            questionHasCorrectAnswer = true;
            break;
        }
    }
    return questionHasCorrectAnswer;
}
function createQuizValidator(quiz) {
    let allQuestionsHaveACorrectAnswer = true;
    const qnas = quiz.qnas;
    for (let i = 0; i < qnas.length; i++) {
        if (!checkCreateQuestionHasCorrectAnswer(qnas[i])) {
            allQuestionsHaveACorrectAnswer = false;
            break;
        }
    }
    return allQuestionsHaveACorrectAnswer;
}
function createQuizEmpty(quiz) {
    if (!quiz.qnas || quiz.qnas.length < 1)
        return false;
    return true;
}
