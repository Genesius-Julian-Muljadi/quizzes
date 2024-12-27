import { NextFunction, Request } from "express";
import prisma from "../../lib/prisma";
import { sign } from "jsonwebtoken";
import { SECRET_KEY } from "../../config";
import AuthUtils from "./utils";

export default class AuthServices {
  static async registerUser(req: Request, next: NextFunction) {
    try {
      const { name, email, password } = req.body;

      const findUser = await AuthUtils.findUserByEmail(email);
      if (findUser) {
        throw new Error("Duplicate email");
      }

      const hashedPassword = await AuthUtils.bcryptHash(password);

      const newUser = await prisma.users.create({
        data: {
          name: name,
          email: email,
          password: hashedPassword,
        },
      });

      return newUser;
    } catch (err) {
      next(err);
    }
  }

  static async loginUser(req: Request, next: NextFunction) {
    try {
      const { email, password } = req.body;
      const findUser = await AuthUtils.findUserByEmail(email);

      AuthUtils.verifyCredentials(findUser, password);

      const payload = {
        id: findUser!.id,
        email: email,
        name: findUser!.name,
      };
      const token = sign(payload, String(SECRET_KEY));

      return token;
    } catch (err) {
      next(err);
    }
  }
}
