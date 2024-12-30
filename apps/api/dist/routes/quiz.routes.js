"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const quiz_controllers_1 = __importDefault(require("../controllers/quiz.controllers"));
const quiz_validation_1 = __importDefault(require("../middlewares/validations/quiz_validation"));
class QuizRoutes {
    constructor() {
        this.controllers = new quiz_controllers_1.default();
        this.validations = new quiz_validation_1.default();
        this.router = (0, express_1.Router)();
        this.routes();
    }
    routes() {
        this.router.get("/create/:id", this.validations.quizValidation, this.controllers.createQuiz);
    }
    getRoutes() {
        return this.router;
    }
}
exports.default = QuizRoutes;