import { Router } from "express";
import QuizControllers from "../controllers/quiz.controllers";
import QuizValidations from "../middlewares/validations/quiz_validation";

export default class QuizRoutes {
  private router;
  private controllers = new QuizControllers();
  private validations = new QuizValidations();

  constructor() {
    this.router = Router();
    this.routes();
  }

  private routes() {
    // Create quiz by userID
    this.router.post(
      "/create/:id",
      this.validations.quizValidation,
      this.controllers.createQuiz
    );
    this.router.post(
      "/edit",
      this.validations.quizValidation,
      this.controllers.editQuiz
    );
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

  public getRoutes() {
    return this.router;
  }
}
