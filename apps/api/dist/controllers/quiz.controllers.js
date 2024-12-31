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
const services_1 = __importDefault(require("../services/quiz.services/services"));
class QuizControllers {
    createQuiz(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newQuiz = yield services_1.default.createQuiz(req, res, next);
                res.status(201).send({
                    message: "Quiz created!",
                    data: newQuiz,
                });
            }
            catch (err) {
                next(err);
                res.status(401).send({
                    message: String(err),
                });
            }
        });
    }
    editQuiz(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newQuiz = yield services_1.default.editQuiz(req, res, next);
                res.status(200).send({
                    message: "Quiz editted!",
                    data: newQuiz,
                });
            }
            catch (err) {
                next(err);
                res.status(401).send({
                    message: String(err),
                });
            }
        });
    }
    removeQuiz(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const oldQuiz = yield services_1.default.removeQuiz(req, res, next);
                res.status(200).send({
                    message: "Quiz deleted!",
                    data: oldQuiz,
                });
            }
            catch (err) {
                next(err);
                res.status(401).send({
                    message: String(err),
                });
            }
        });
    }
    getQuizByQuizID(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const quiz = yield services_1.default.getQuizByQuizID(req, res, next);
                res.status(200).send({
                    message: "Quiz retrieved!",
                    data: quiz,
                });
            }
            catch (err) {
                next(err);
                res.status(401).send({
                    message: String(err),
                });
            }
        });
    }
    getAllQuizzes(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const quizzes = yield services_1.default.getAllQuizzes(req, res, next);
                res.status(200).send({
                    message: "Quizzes retrieved!",
                    data: quizzes,
                });
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
exports.default = QuizControllers;
