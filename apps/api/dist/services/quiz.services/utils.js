"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = __importDefault(require("../../lib/prisma"));
class QuizUtils {
    static generateQuiz(client, quiz) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newQuiz = client.quizzes.create({
                    data: {
                        id: quiz.id ? quiz.id : undefined,
                        title: quiz.title,
                        qCount: quiz.qnas.length,
                    },
                });
                return newQuiz;
            }
            catch (err) {
                throw err;
            }
        });
    }
    static generateQnA(client, qna, quizID) {
        return __awaiter(this, void 0, void 0, function* () {
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
            }
            catch (err) {
                throw err;
            }
        });
    }
    static generateAnswer(client, answer, qnaID) {
        return __awaiter(this, void 0, void 0, function* () {
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
            }
            catch (err) {
                throw err;
            }
        });
    }
    static generateEntireQuiz(client, quiz) {
        return __awaiter(this, void 0, void 0, function* () {
            const newQuiz = yield this.generateQuiz(client, quiz);
            const qnas = quiz.qnas;
            for (let i = 0; i < qnas.length; i++) {
                const newQnA = yield this.generateQnA(client, qnas[i], newQuiz.id);
                const answers = qnas[i].answers;
                for (let j = 0; j < answers.length; j++) {
                    yield this.generateAnswer(client, answers[j], newQnA.id);
                }
            }
            return newQuiz;
        });
    }
    static updateQuiz(client, quiz, quizID) {
        return __awaiter(this, void 0, void 0, function* () {
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
            }
            catch (err) {
                throw err;
            }
        });
    }
    static updateQnA(client, qna, qnaID) {
        return __awaiter(this, void 0, void 0, function* () {
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
            }
            catch (err) {
                throw err;
            }
        });
    }
    static updateAnswer(client, answer, answerID) {
        return __awaiter(this, void 0, void 0, function* () {
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
            }
            catch (err) {
                throw err;
            }
        });
    }
    static deleteQuiz(client, quizID) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // This will not result in an error due to onDelete: Cascade in schema.prisma
                const deletedQuiz = client.quizzes.delete({
                    where: {
                        id: quizID,
                    },
                });
                return deletedQuiz;
            }
            catch (err) {
                throw err;
            }
        });
    }
    static deleteQnA(client, qnaID) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // This will not result in an error due to onDelete: Cascade in schema.prisma
                const deletedQnA = client.quiz_QnA.delete({
                    where: {
                        id: qnaID,
                    },
                });
                return deletedQnA;
            }
            catch (err) {
                throw err;
            }
        });
    }
    static deleteAnswer(client, answerID) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const deletedAnswer = client.quiz_Answers.delete({
                    where: {
                        id: answerID,
                    },
                });
                return deletedAnswer;
            }
            catch (err) {
                throw err;
            }
        });
    }
    static validateFindQuizID(quizID) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (typeof quizID !== "number")
                    throw new Error("Bad Quiz ID!");
                const findQuiz = prisma_1.default.quizzes.findUnique({
                    where: {
                        id: quizID,
                    },
                });
                if (!findQuiz)
                    throw new Error("Quiz ID not found!");
                return findQuiz;
            }
            catch (err) {
                throw err;
            }
        });
    }
}
exports.default = QuizUtils;