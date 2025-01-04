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
    this.router.get("/getAllQuizzes", this.controllers.getAllQuizzes);
    // Submit quiz with quiz-taker's ID
    this.router.post("/submit/:id", this.controllers.submitQuiz);
  }

  public getRoutes() {
    return this.router;
  }
}
