"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const custom_validators_1 = require("./custom_validators");
class QuizValidations {
    constructor() {
        this.quizValidation = [
            (0, express_validator_1.body)("quiz")
                .custom(custom_validators_1.quizValidator)
                .withMessage("Quiz contains either no questions or a question contains no correct answers."),
            (req, res, next) => {
                try {
                    const errors = (0, express_validator_1.validationResult)(req);
                    if (!errors.isEmpty()) {
                        console.log(req.body.quiz);
                        throw new Error(errors.array()[0].msg);
                    }
                    next();
                }
                catch (err) {
                    next(err);
                }
            },
        ];
    }
}
exports.default = QuizValidations;
