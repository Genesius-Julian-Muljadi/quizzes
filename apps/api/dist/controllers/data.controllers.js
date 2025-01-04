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
const services_1 = __importDefault(require("../services/data.services/services"));
class DataControllers {
    populateUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newUser = yield services_1.default.registerUser(req);
                res.status(200).send({
                    message: "User inserted",
                    data: newUser,
                });
            }
            catch (err) {
                next(err);
                res.status(401).send({
                    message: String(err),
                });
            }
        });
    }
    getAllUsers(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const allUsers = yield services_1.default.getAllUsers(req);
                res.status(200).send({
                    message: "Users fetched",
                    data: allUsers,
                });
            }
            catch (err) {
                next(err);
                res.status(401).send({
                    message: String(err),
                });
            }
        });
    }
    createQuiz(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newQuiz = yield services_1.default.createQuiz(req);
                res.status(201).send({
                    message: "Quiz populated",
                    data: newQuiz,
                });
            }
            catch (err) {
                next(err);
                res.status(401).send({
                    message: String(err),
                });
            }
        });
    }
    deleteAll(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield services_1.default.deleteAll(req);
                res.status(200).send({
                    message: "All data deleted",
                });
            }
            catch (err) {
                next(err);
                res.status(401).send({
                    message: String(err),
                });
            }
        });
    }
}
exports.default = DataControllers;
