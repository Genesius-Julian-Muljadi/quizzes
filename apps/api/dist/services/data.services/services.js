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
const utils_1 = __importDefault(require("./utils"));
class DataServices {
    static registerUser(req) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, name, password } = req.body;
                const creationDate = utils_1.default.forgeCreationDate(4);
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
                        dateCreated: creationDate,
                    },
                });
                return newUser;
            }
            catch (err) {
                throw err;
            }
        });
    }
    static getAllUsers(req) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const allUsers = yield prisma_1.default.users.findMany();
                return allUsers;
            }
            catch (err) {
                throw err;
            }
        });
    }
    static createQuiz(req) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const quiz = req.body.quiz;
                let newQuiz;
                yield prisma_1.default.$transaction((prisma) => __awaiter(this, void 0, void 0, function* () {
                    newQuiz = yield utils_1.default.generateEntireQuiz(prisma, quiz);
                }));
                return newQuiz;
            }
            catch (err) {
                throw err;
            }
        });
    }
    static deleteAll(req) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield prisma_1.default.$transaction((prisma) => __awaiter(this, void 0, void 0, function* () {
                    yield utils_1.default.deleteAll(prisma);
                }));
            }
            catch (err) {
                throw err;
            }
        });
    }
}
exports.default = DataServices;
