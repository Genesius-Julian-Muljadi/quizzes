import { Request, Response, NextFunction } from "express";
import { body, validationResult } from "express-validator";
import { quizValidator } from "./custom_validators";

export default class DataQuizValidations {
  public quizValidation = [
    body("quiz")
      .custom(quizValidator)
      .withMessage(
        "Quiz contains either no questions or a question contains no correct answers."
      ),
    (req: Request, res: Response, next: NextFunction) => {
      try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          console.log(req.body.quiz);
          throw new Error(errors.array()[0].msg);
        }
        next();
      } catch (err) {
        res.status(401).send({
          message: String(err),
        });
        next(err);
      }
    },
  ];
}
