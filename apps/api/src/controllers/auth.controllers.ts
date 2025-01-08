import { NextFunction, Request, Response } from "express";
import AuthServices from "../services/auth.services/services";

const cookieDurationInMinutes = 40;

export default class AuthControllers {
  public async registerUser(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await AuthServices.registerUser(req);
      if (!user) throw new Error("Register failed");

      res.status(200).send({
        message: "Registration successful!",
        data: user,
      });
    } catch (err) {
      next(err);
      res.status(401).send({
        message: String(err),
      });
    }
  }

  public async loginUser(req: Request, res: Response, next: NextFunction) {
    try {
      const authToken = await AuthServices.loginUser(req);
      if (!authToken) throw new Error("Login failed");

      res
        .status(200)
        .cookie("access_token", authToken, {
          expires: new Date(
            new Date().valueOf() + cookieDurationInMinutes * 60000
          ),
        })
        .send({
          message: "Login successful!",
          cookie: authToken,
        });
    } catch (err) {
      next(err);
      res.status(401).send({
        message: String(err),
      });
    }
  }
}
