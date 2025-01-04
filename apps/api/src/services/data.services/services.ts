import { Request } from "express";
import prisma from "../../lib/prisma";
import DataUtils from "./utils";
import Quiz from "../../interfaces/quiz";

export default class DataServices {
  static async registerUser(req: Request) {
    try {
      const { email, name, password } = req.body;

      const creationDate: Date = DataUtils.forgeCreationDate(4);

      const findUser = await DataUtils.findUserByEmail(email);
      if (findUser) {
        throw new Error("Duplicate email");
      }

      const hashedPassword = await DataUtils.bcryptHash(password);

      const newUser = await prisma.users.create({
        data: {
          name: name,
          email: email,
          password: hashedPassword,
          dateCreated: creationDate,
        },
      });

      return newUser;
    } catch (err) {
      throw err;
    }
  }

  static async getAllUsers(req: Request) {
    try {
      const allUsers = await prisma.users.findMany();

      return allUsers;
    } catch (err) {
      throw err;
    }
  }

  static async createQuiz(req: Request) {
    try {
      const quiz = req.body.quiz as Quiz;

      let newQuiz: Quiz;
      await prisma.$transaction(async (prisma) => {
        newQuiz = await DataUtils.generateEntireQuiz(prisma, quiz);
      });

      return newQuiz!;
    } catch (err) {
      throw err;
    }
  }

  static async deleteAll(req: Request) {
    try {
      await prisma.$transaction(async (prisma) => {
        await DataUtils.deleteAll(prisma);
      });
    } catch (err) {
      throw err;
    }
  }
}
