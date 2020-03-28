import dotenv from "dotenv";
import { Request, Response, Router } from "express";
import app from "./app";

// Initialize configuration
dotenv.config();

const port: number = parseInt(`${process.env.SERVER_PORT}`, 10) || 3000;
const router: any = Router();

app.use("/", router);

router.get("/sample", (req: Request, res: Response): object => {
  return res.json({ status: "success", message: "Welcome to API Service" });
});

app.listen(port, (err: Error) => {
  if (err) {
    throw new Error(err.message);
  }
  console.log(`App listening on port ${port}`);
});
