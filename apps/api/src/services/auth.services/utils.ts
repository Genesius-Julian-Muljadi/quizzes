import { NextFunction, Response } from "express";
import prisma from "../../lib/prisma";
import { compare, genSalt, hash } from "bcrypt";

export default class AuthUtils {
  static async findUserByEmail(email: string) {
    try {
      const user = await prisma.users.findUnique({
        where: {
          email: email,
        },
      });

      return user;
    } catch (err) {
      throw err;
    }
  }

  static async bcryptHash(password: string) {
    try {
      const salt = await genSalt(10);
      const hashedPassword = await hash(password, salt);

      return hashedPassword;
    } catch (err) {
      throw err;
    }
  }

  static async verifyCredentials(user: any, password: string, res: Response, next: NextFunction) {
    try {
      if (!user) throw new Error("Invalid credentials");

      const passwordMatches = await compare(password, user.password);
      if (!passwordMatches) throw new Error("Invalid credentials");
    } catch (err) {
      next(err);
      res.status(401).send({
        message: String(err)
      })
    }
  }
}
