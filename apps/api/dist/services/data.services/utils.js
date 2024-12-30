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
const bcrypt_1 = require("bcrypt");
class DataUtils {
    static findUserByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield prisma_1.default.users.findUnique({
                    where: {
                        email: email,
                    },
                });
                return user;
            }
            catch (err) {
                throw err;
            }
        });
    }
    static bcryptHash(password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const salt = yield (0, bcrypt_1.genSalt)(10);
                const hashedPassword = yield (0, bcrypt_1.hash)(password, salt);
                return hashedPassword;
            }
            catch (err) {
                throw err;
            }
        });
    }
    static forgeCreationDate(years) {
        const creationDate = new Date(new Date().valueOf() - Math.random() * (1000 * 60 * 60 * 24 * 365 * years) // Up to years prior
        );
        return creationDate;
    }
    static generateQuiz(client, quiz) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newQuiz = client.quizzes.create({
                    data: {
                        id: quiz.id ? quiz.id : undefined,
                        userID: quiz.userID,
                        title: quiz.title,
                        qCount: quiz.qnas.length,
                        dateCreated: quiz.dateCreated ? quiz.dateCreated : undefined,
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
    static deleteAll(client) {
        return __awaiter(this, void 0, void 0, function* () {
            yield client.users.deleteMany({});
        });
    }
}
exports.default = DataUtils;
