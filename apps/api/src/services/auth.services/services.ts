import { Request } from "express";
import prisma from "../../lib/prisma";
import { sign } from "jsonwebtoken";
import { SECRET_KEY } from "../../config";
import AuthUtils from "./utils";

export default class AuthServices {
  static async registerUser(req: Request) {
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
      throw err;
    }
  }

  static async loginUser(req: Request) {
    try {
      const { email, password } = req.body;
      const findUser = await AuthUtils.findUserByEmail(email);

      await AuthUtils.verifyCredentials(findUser, password);

      const payload = {
        id: findUser!.id,
        email: email,
        name: findUser!.name,
      };
      const token = sign(payload, String(SECRET_KEY));

      return token;
    } catch (err) {
      throw err;
    }
  }
}
