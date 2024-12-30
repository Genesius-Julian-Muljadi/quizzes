import { Router } from "express";
import AuthControllers from "../controllers/auth.controllers";
import AuthValidations from "../middlewares/validations/auth_validation";

export default class AuthRoutes {
  private router;
  private controllers = new AuthControllers();
  private validations = new AuthValidations();

  constructor() {
    this.router = Router();
    this.routes();
  }

  private routes() {
    this.router.post(
      "/register",
      this.validations.registerValidationUser,
      this.controllers.registerUser
    );
    this.router.post(
      "/login",
      this.validations.loginValidationUser,
      this.controllers.loginUser
    );
  }

  public getRoutes() {
    return this.router;
  }
}
