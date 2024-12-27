import { Request, Response, NextFunction } from "express";
import { body, validationResult } from "express-validator";
import { quizValidator } from "./custom_validators";

export default class QuizValidations {
  public registerValidationUser = [
    body("quiz")
      .isArray()
      .custom(quizValidator),
    (req: Request, res: Response, next: NextFunction) => {
      try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          throw new Error(errors.array()[0].msg);
        }
        next();
      } catch (err) {
        next(err);
      }
    },
  ];
}
