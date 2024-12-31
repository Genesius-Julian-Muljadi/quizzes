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
    static createQuiz(req, res, next) {
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
                next(err);
                res.status(401).send({
                    message: String(err),
                });
            }
        });
    }
    static editQuiz(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newQuiz = req.body.quiz; // Quiz should contain current quizID
                yield utils_1.default.validateFindQuizID(newQuiz.id);
                yield prisma_1.default.$transaction((prisma) => __awaiter(this, void 0, void 0, function* () {
                    yield utils_1.default.deleteQuiz(prisma, newQuiz.id);
                    yield utils_1.default.generateEntireQuiz(prisma, newQuiz, newQuiz.userID);
                }));
                return newQuiz;
            }
            catch (err) {
                next(err);
                res.status(401).send({
                    message: String(err),
                });
            }
        });
    }
    static removeQuiz(req, res, next) {
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
                next(err);
                res.status(401).send({
                    message: String(err),
                });
            }
        });
    }
    static getQuizByQuizID(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const quizID = req.params.id;
                const quiz = yield utils_1.default.validateFindQuizID(parseInt(quizID));
                return quiz;
            }
            catch (err) {
                next(err);
                res.status(401).send({
                    message: String(err),
                });
            }
        });
    }
    static getAllQuizzes(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const quizzes = yield utils_1.default.findAllQuizzes();
                return quizzes;
            }
            catch (err) {
                next(err);
                res.status(401).send({
                    message: String(err),
                });
            }
        });
    }
}
exports.default = QuizServices;
