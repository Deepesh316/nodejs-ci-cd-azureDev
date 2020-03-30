import { Request, Response, NextFunction } from "express";
import { get } from "lodash";

export const validationErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (get(err, "error.isJoi", false)) {
    // we had a joi error, let's return a custom 400 json response
    res.status(400).end(err.error.toString());
  } else {
    // pass on to another error handler
    next(err);
  }
};
