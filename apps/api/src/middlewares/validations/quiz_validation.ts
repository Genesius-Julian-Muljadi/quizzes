import { Request, Response, NextFunction } from "express";
import { body, validationResult } from "express-validator";
import { createQuizEmpty, createQuizValidator } from "./custom_validators";

export default class QuizValidations {
  public quizValidation = [
    body("quiz")
      .exists()
      .withMessage("Quiz does not exist!")
      .custom(createQuizEmpty)
      .withMessage("Quiz contains no questions!")
      .custom(createQuizValidator)
      .withMessage("A question contains no correct answers."),
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
