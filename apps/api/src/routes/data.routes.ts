import { Router } from "express";
import DataControllers from "../controllers/data.controllers";
import QuizValidations from "../middlewares/validations/quiz_validation";

export default class DataRoutes {
  private router;
  private controllers = new DataControllers();
  private validations = new QuizValidations();

  constructor() {
    this.router = Router();
    this.routes();
  }

  private routes() {
    this.router.post("/users", this.controllers.populateUser);
    this.router.get("/users", this.controllers.getAllUsers);
    this.router.post(
      "/quiz",
      this.validations.quizValidation,
      this.controllers.createQuiz
    );
    this.router.delete("", this.controllers.deleteAll);
  }

  public getRoutes() {
    return this.router;
  }
}
