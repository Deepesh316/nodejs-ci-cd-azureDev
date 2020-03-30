import { Request, Response, NextFunction } from "express";
import httpErrors from "http-errors";
import User from "../models/user.model";
import UserService from "../services/user.service";

const userService = new UserService();

class UserController {
  /**
   * Function to create new user
   * @param req
   * @param res
   * @param next
   */
  async createUser(req: Request, res: Response, next: NextFunction) {
    const { name, email, password } = req.body;
    const user = new User({ name, email, password });

    try {
      const userCreated = await userService.createUserService(user);
      res.status(201).json({ status: 201, data: userCreated });
    } catch (err) {
      next(httpErrors(500, err.message));
    }
  }
}

export default new UserController();
