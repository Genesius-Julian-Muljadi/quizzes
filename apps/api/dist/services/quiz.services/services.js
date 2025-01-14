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
const utils_1 = __importDefault(require("./utils"));
class QuizServices {
    static createQuiz(req) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const quiz = req.body.quiz;
                const userID = req.params.id;
                let newQuiz;
                yield prisma_1.default.$transaction((prisma) => __awaiter(this, void 0, void 0, function* () {
                    newQuiz = yield utils_1.default.generateEntireQuiz(prisma, quiz, parseInt(userID));
                }));
                return newQuiz;
            }
            catch (err) {
                throw err;
            }
        });
    }
    static editQuiz(req) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newQuiz = req.body.quiz; // Quiz should contain current quizID
                const quizID = req.params.id;
                const oldQuiz = yield utils_1.default.validateFindQuizID(parseInt(quizID));
                yield prisma_1.default.$transaction((prisma) => __awaiter(this, void 0, void 0, function* () {
                    yield utils_1.default.deleteQuiz(prisma, parseInt(quizID));
                    yield utils_1.default.generateEntireQuiz(prisma, newQuiz, oldQuiz.userID, oldQuiz.id, oldQuiz.dateCreated);
                }));
                return newQuiz;
            }
            catch (err) {
                throw err;
            }
        });
    }
    static removeQuiz(req) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const oldQuizID = req.body.id;
                yield utils_1.default.validateFindQuizID(parseInt(oldQuizID));
                let oldQuiz;
                yield prisma_1.default.$transaction((prisma) => __awaiter(this, void 0, void 0, function* () {
                    oldQuiz = yield utils_1.default.deleteQuiz(prisma, parseInt(oldQuizID));
                }));
                return oldQuiz;
            }
            catch (err) {
                throw err;
            }
        });
    }
    static getQuizByQuizID(req) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const quizID = req.params.id;
                const quiz = yield utils_1.default.validateFindQuizID(parseInt(quizID));
                return quiz;
            }
            catch (err) {
                throw err;
            }
        });
    }
    static getAllQuizzes(req) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userID = req.params.id ? req.params.id : undefined;
                const quizzes = yield utils_1.default.findAllQuizzes(userID ? parseInt(userID) : undefined);
                return quizzes;
            }
            catch (err) {
                throw err;
            }
        });
    }
    static evaluate_recordQuiz(req) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const submittedQuiz = req.body.quiz;
                const userID = req.params.id;
                const valuationQuiz = yield utils_1.default.validateFindQuizID(parseInt(submittedQuiz.id));
                const correctQnAs = utils_1.default.evaluateQuiz(submittedQuiz, valuationQuiz);
                const newRecord = yield utils_1.default.recordQuiz(parseInt(userID), parseInt(submittedQuiz.id), correctQnAs, submittedQuiz);
                return { score: correctQnAs, record: newRecord };
            }
            catch (err) {
                throw err;
            }
        });
    }
    static getHistory(req) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userID = req.params.id;
                const quizzes = yield utils_1.default.findHistory(parseInt(userID));
                return quizzes;
            }
            catch (err) {
                throw err;
            }
        });
    }
}
exports.default = QuizServices;
