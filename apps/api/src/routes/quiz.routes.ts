import { Router } from "express";

export default class QuizRoutes {
  private router;
//   private controllers = new QuizControllers();
//   private validations = new QuizValidations();

  constructor() {
    this.router = Router();
    this.routes();
  }

  private routes() {
    // this.router.get(
    //   "/register",
    //   this.validations.registerValidationUser,
    //   this.controllers.registerUser
    // );
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
