import { Router } from "express";
import { createValidator } from "express-joi-validation";

import { validationErrorHandler } from "../common/validationErrorHandler";
import createUserSchema from "../services/request/createUserSchema";
import userController from "../controller/user.controller";

const router: any = Router();
const requestValidator = createValidator({ passError: true, statusCode: 400 });

// User routes
router.post(
  "/users",
  requestValidator.body(createUserSchema),
  validationErrorHandler,
  userController.createUser
);

export default router;
