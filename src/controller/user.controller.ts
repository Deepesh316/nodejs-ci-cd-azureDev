import { Request, Response, NextFunction } from "express";
import httpErrors from "http-errors";
import { UserService } from "../services/user.service";

class UserController {
  /**
   * Function to create new user
   * @param req
   * @param res
   * @param next
   */
  async createUser(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const userCreated = await UserService.createUserService(req.body);

      res.status(201).json({ status: 201, data: userCreated });
    } catch (err) {
      next(httpErrors(500, err.message));
    }
  }
}

export default new UserController();
