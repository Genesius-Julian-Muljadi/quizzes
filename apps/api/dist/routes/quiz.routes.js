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
        // Create quiz by userID
        this.router.post("/create/:id", this.validations.quizValidation, this.controllers.createQuiz);
        // Edit quiz by userID
        this.router.post("/edit/:id", this.validations.quizValidation, this.controllers.editQuiz);
        // Accepts quizID as body
        this.router.delete("/delete", this.controllers.removeQuiz);
        // Get quiz by quizID
        this.router.get("/getQuiz/:id", this.controllers.getQuizByQuizID);
        // Get all quizzes by userID (if omitted, get all quizzes)
        this.router.get("/getAllQuizzes", this.controllers.getAllQuizzes);
        this.router.get("/getAllQuizzes/:id", this.controllers.getAllQuizzes);
        // Submit quiz with quiz-taker's ID
        this.router.post("/submit/:id", this.controllers.submitQuiz);
        // Get completed quizzes by userID
        this.router.get("/getHistory/:id", this.controllers.getHistoryByUserID);
    }
    getRoutes() {
        return this.router;
    }
}
exports.default = QuizRoutes;
