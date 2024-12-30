import { Request, Response, NextFunction } from "express";
import { body, validationResult } from "express-validator";

export default class AuthValidations {
  public registerValidationUser = [
    body("email")
      .trim()
      .notEmpty()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Invalid email format"),
    body("name").trim().notEmpty().withMessage("Name is required"),
    body("password")
      .trim()
      .notEmpty()
      .withMessage("Password is required")
      .isLength({ min: 6 })
      .withMessage("Passwords must contain at least 6 characters"),
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

  public loginValidationUser = [
    body("email")
      .trim()
      .notEmpty()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Invalid email format"),
    body("password")
      .trim()
      .notEmpty()
      .withMessage("Password is required")
      .isLength({ min: 6 })
      .withMessage("Passwords contain at least 6 characters"),
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
