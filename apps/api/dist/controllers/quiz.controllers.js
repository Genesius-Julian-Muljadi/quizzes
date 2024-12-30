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
                const newQuiz = yield services_1.default.createQuiz(req, next);
                res.status(201).send({
                    message: "Quiz created!",
                    data: newQuiz,
                });
            }
            catch (err) {
                next(err);
            }
        });
    }
    editQuiz(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newQuiz = yield services_1.default.editQuiz(req, next);
                res.status(200).send({
                    message: "Quiz editted!",
                    data: newQuiz,
                });
            }
            catch (err) {
                next(err);
            }
        });
    }
    removeQuiz(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const oldQuiz = yield services_1.default.removeQuiz(req, next);
                res.status(200).send({
                    message: "Quiz deleted!",
                    data: oldQuiz,
                });
            }
            catch (err) {
                next(err);
            }
        });
    }
}
exports.default = QuizControllers;
