"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
class AuthValidations {
    constructor() {
        this.registerValidationUser = [
            (0, express_validator_1.body)("email")
                .trim()
                .notEmpty()
                .withMessage("Email is required")
                .isEmail()
                .withMessage("Invalid email format"),
            (0, express_validator_1.body)("name").trim().notEmpty().withMessage("Name is required"),
            (0, express_validator_1.body)("password")
                .trim()
                .notEmpty()
                .withMessage("Password is required")
                .isLength({ min: 6 })
                .withMessage("Passwords must contain at least 6 characters"),
            (req, res, next) => {
                try {
                    const errors = (0, express_validator_1.validationResult)(req);
                    if (!errors.isEmpty()) {
                        throw new Error(errors.array()[0].msg);
                    }
                    next();
                }
                catch (err) {
                    res.status(401).send({
                        message: String(err),
                    });
                    next(err);
                }
            },
        ];
        this.loginValidationUser = [
            (0, express_validator_1.body)("email")
                .trim()
                .notEmpty()
                .withMessage("Email is required")
                .isEmail()
                .withMessage("Invalid email format"),
            (0, express_validator_1.body)("password")
                .trim()
                .notEmpty()
                .withMessage("Password is required")
                .isLength({ min: 6 })
                .withMessage("Passwords contain at least 6 characters"),
            (req, res, next) => {
                try {
                    const errors = (0, express_validator_1.validationResult)(req);
                    if (!errors.isEmpty()) {
                        throw new Error(errors.array()[0].msg);
                    }
                    next();
                }
                catch (err) {
                    res.status(401).send({
                        message: String(err),
                    });
                    next(err);
                }
            },
        ];
    }
}
exports.default = AuthValidations;
