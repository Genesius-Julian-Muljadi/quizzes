import { NextFunction, Request, Response } from "express";
import DataServices from "../services/data.services/services";

export default class DataControllers {
  public async populateUser(req: Request, res: Response, next: NextFunction) {
    try {
      const newUser = await DataServices.registerUser(req, res, next);

      res.status(200).send({
        message: "User inserted",
        data: newUser,
      });
    } catch (err) {
      next(err);
      res.status(401).send({
        message: String(err)
      })
    }
  }

  public async getAllUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const allUsers = await DataServices.getAllUsers(req, res, next);

      res.status(200).send({
        message: "Users fetched",
        data: allUsers,
      });
    } catch (err) {
      next(err);
      res.status(401).send({
        message: String(err)
      })
    }
  }

  public async createQuiz(req: Request, res: Response, next: NextFunction) {
    try {
      const newQuiz = await DataServices.createQuiz(req, res, next);

      res.status(201).send({
        message: "Quiz populated",
        data: newQuiz,
      });
    } catch (err) {
      next(err);
      res.status(401).send({
        message: String(err)
      })
    }
  }

  public async deleteAll(req: Request, res: Response, next: NextFunction) {
    try {
      await DataServices.deleteAll(req, res, next);

      res.status(200).send({
        message: "All data deleted",
      });
    } catch (err) {
      next(err);
      res.status(401).send({
        message: String(err)
      })
    }
  }
}
