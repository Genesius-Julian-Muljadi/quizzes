"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const data_controllers_1 = __importDefault(require("../controllers/data.controllers"));
const quiz_validation_1 = __importDefault(require("../middlewares/validations/quiz_validation"));
class DataRoutes {
    constructor() {
        this.controllers = new data_controllers_1.default();
        this.validations = new quiz_validation_1.default();
        this.router = (0, express_1.Router)();
        this.routes();
    }
    routes() {
        this.router.post("/users", this.controllers.populateUser);
        this.router.get("/users", this.controllers.getAllUsers);
        this.router.post("/quiz", this.validations.quizValidation, this.controllers.createQuiz);
        this.router.delete("", this.controllers.deleteAll);
    }
    getRoutes() {
        return this.router;
    }
}
exports.default = DataRoutes;
