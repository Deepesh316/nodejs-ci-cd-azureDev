import dotenv from "dotenv";
import router from "../src/routes/routes";
import app from "./app";

// Initialize configuration
dotenv.config();

const port: number = parseInt(`${process.env.SERVER_PORT}`, 10) || 3000;

app.use("/api/v1", router);

app.listen(port, (err: Error) => {
  if (err) {
    throw new Error(err.message);
  }
  console.log(`App listening on port ${port}! from ${process.cwd()}`);
});
