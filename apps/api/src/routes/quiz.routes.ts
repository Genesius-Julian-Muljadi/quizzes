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
    this.router.get(
      "/create",
      this.validations.registerValidationUser,
      this.controllers.createQuiz
    );
    // this.router.get(
    //   "/login",
    //   this.validations.loginValidationUser,
    //   this.controllers.loginUser
    // );
  }

  public getRoutes() {
    return this.router;
  }
}
