"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controllers_1 = __importDefault(require("../controllers/auth.controllers"));
class AuthRoutes {
    constructor() {
        this.controllers = new auth_controllers_1.default();
        this.router = (0, express_1.Router)();
        this.routes();
    }
    ;
    routes() {
        this.router.get("/register", this.controllers.registerUser);
        this.router.get("/login", this.controllers.loginUser);
    }
    ;
    getRoutes() {
        return this.router;
    }
    ;
}
exports.default = AuthRoutes;
;
