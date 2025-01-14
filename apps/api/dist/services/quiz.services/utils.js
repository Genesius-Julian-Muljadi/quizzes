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
    static generateQuiz(client, quiz, userID, quizID, dateCreated) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newQuiz = yield client.quizzes.create({
                    data: {
                        id: quizID || undefined,
                        userID: userID,
                        title: quiz.title,
                        qCount: quiz.qnas.length,
                        dateCreated: dateCreated || undefined,
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
                const newQnA = yield client.quiz_QnA.create({
                    data: {
                        quizID: quizID,
                        question: qna.question,
                        multiple: qna.answers.filter((answer) => {
                            return answer.correct;
                        }).length > 1,
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
                const newAnswer = yield client.quiz_Answers.create({
                    data: {
                        qnaID: qnaID,
                        answer: answer.answer,
                        correct: answer.correct === "true",
                    },
                });
                return newAnswer;
            }
            catch (err) {
                throw err;
            }
        });
    }
    static generateEntireQuiz(client, quiz, userID, quizID, dateCreated) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newQuiz = yield this.generateQuiz(client, quiz, userID, quizID, dateCreated);
                const qnas = quiz.qnas || [];
                for (let i = 0; i < qnas.length; i++) {
                    const newQnA = yield this.generateQnA(client, qnas[i], newQuiz.id);
                    const answers = qnas[i].answers;
                    for (let j = 0; j < answers.length; j++) {
                        yield this.generateAnswer(client, answers[j], newQnA.id);
                    }
                }
                return newQuiz;
            }
            catch (err) {
                throw err;
            }
        });
    }
    static updateQuiz(client, quiz, quizID) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const newQuiz = yield client.quizzes.update({
                    data: {
                        title: quiz.title,
                        qCount: ((_a = quiz.qnas) === null || _a === void 0 ? void 0 : _a.length) || -1,
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
                const newQnA = yield client.quiz_QnA.update({
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
                const newQnA = yield client.quiz_Answers.update({
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
                const deletedQuiz = yield client.quizzes.delete({
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
                const deletedQnA = yield client.quiz_QnA.delete({
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
                const deletedAnswer = yield client.quiz_Answers.delete({
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
                const findQuiz = yield prisma_1.default.quizzes.findUnique({
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
                if (!findQuiz)
                    throw new Error("Quiz ID not found!");
                return findQuiz;
            }
            catch (err) {
                throw err;
            }
        });
    }
    static findAllQuizzes(userID) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const findQuizzes = yield prisma_1.default.quizzes.findMany({
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
                if (!findQuizzes)
                    throw new Error("Unable to find quizzes");
                if (findQuizzes.length < 1)
                    throw new Error("No quizzes available");
                return findQuizzes;
            }
            catch (err) {
                throw err;
            }
        });
    }
    static sortAnswers(answers) {
        return answers.sort((answerID_1, answerID_2) => parseInt(answerID_1) - parseInt(answerID_2));
    }
    static evaluateQnA(submission, valuation) {
        const correctAnswers = valuation.answers
            .filter((answer) => {
            return answer.correct;
        })
            .map((answer) => {
            return answer.id.toString();
        });
        if (Array.isArray(submission.answers)) {
            const answerIDArray = submission.answers;
            return (JSON.stringify(this.sortAnswers(correctAnswers)) ===
                JSON.stringify(this.sortAnswers(answerIDArray)));
        }
        else {
            const answerID = submission.answers;
            return correctAnswers.length === 1 && answerID === correctAnswers[0];
        }
    }
    static evaluateQuiz(submission, valuation) {
        try {
            if (parseInt(submission.id) !== valuation.id ||
                submission.qnas.length !== valuation.qCount)
                throw new Error("Quizzes incompatible");
            let correctQnAs = 0;
            for (let k in submission.qnas) {
                if (this.evaluateQnA(submission.qnas[k], valuation.qnas[k]))
                    correctQnAs++;
            }
            return correctQnAs;
        }
        catch (err) {
            throw err;
        }
    }
    static recordQuiz(userID, quizID, score, submission) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let newRecord;
                yield prisma_1.default.$transaction((prisma) => __awaiter(this, void 0, void 0, function* () {
                    newRecord = yield prisma.quiz_History.create({
                        data: {
                            userID: userID,
                            quizID: quizID,
                            score: score,
                            submission: JSON.stringify(submission),
                        },
                    });
                }));
                if (!newRecord)
                    throw new Error("Record quiz failed");
                return newRecord;
            }
            catch (err) {
                throw err;
            }
        });
    }
    static findHistory(userID) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const findQuizzes = yield prisma_1.default.quiz_History.findMany({
                    where: {
                        userID: userID,
                    },
                });
                if (!findQuizzes)
                    throw new Error("Unable to find quizzes");
                return findQuizzes;
            }
            catch (err) {
                throw err;
            }
        });
    }
}
exports.default = QuizUtils;
