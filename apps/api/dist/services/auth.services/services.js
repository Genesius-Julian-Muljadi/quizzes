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
const prisma_1 = __importDefault(require("../../lib/prisma"));
const jsonwebtoken_1 = require("jsonwebtoken");
const config_1 = require("../../config");
const utils_1 = __importDefault(require("./utils"));
class AuthServices {
    static registerUser(req) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, email, password } = req.body;
                const findUser = yield utils_1.default.findUserByEmail(email);
                if (findUser) {
                    throw new Error("Duplicate email");
                }
                const hashedPassword = yield utils_1.default.bcryptHash(password);
                const newUser = yield prisma_1.default.users.create({
                    data: {
                        name: name,
                        email: email,
                        password: hashedPassword,
                    },
                });
                return newUser;
            }
            catch (err) {
                throw err;
            }
        });
    }
    static loginUser(req) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                const findUser = yield utils_1.default.findUserByEmail(email);
                yield utils_1.default.verifyCredentials(findUser, password);
                const payload = {
                    id: findUser.id,
                    email: email,
                    name: findUser.name,
                };
                const token = (0, jsonwebtoken_1.sign)(payload, String(config_1.SECRET_KEY));
                return token;
            }
            catch (err) {
                throw err;
            }
        });
    }
}
exports.default = AuthServices;
