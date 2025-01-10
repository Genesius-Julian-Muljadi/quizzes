"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const services_1 = __importDefault(require("../services/auth.services/services"));
const cookieDurationInMinutes = 40;
class AuthControllers {
    registerUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield services_1.default.registerUser(req);
                if (!user)
                    throw new Error("Register failed");
                res.status(200).send({
                    message: "Registration successful!",
                    data: user,
                });
            }
            catch (err) {
                res.status(401).send({
                    message: String(err),
                });
                next(err);
            }
        });
    }
    loginUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const authToken = yield services_1.default.loginUser(req);
                if (!authToken)
                    throw new Error("Login failed");
                res
                    .status(200)
                    .cookie("access_token", authToken, {
                    expires: new Date(new Date().valueOf() + cookieDurationInMinutes * 60000),
                })
                    .send({
                    message: "Login successful!",
                    cookie: authToken,
                });
            }
            catch (err) {
                res.status(401).send({
                    message: String(err),
                });
                next(err);
            }
        });
    }
}
exports.default = AuthControllers;
