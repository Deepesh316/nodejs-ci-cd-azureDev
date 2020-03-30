// contains basic express configuration

import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import helmet from "helmet";
import express, { Application } from "express";

class App {
  public app: Application;

  constructor() {
    this.app = express();
    this.setConfig();
  }

  private setConfig() {
    this.app.use(bodyParser.json()); // Allows us to receive requests with data in json format
    this.app.use(bodyParser.urlencoded({ extended: true })); // Allows us to receive requests with data in x-www-form-urlencoded format
    this.app.use(cookieParser()); // Cookies parser
    this.app.use(cors()); // Enables cors
    this.app.use(helmet()); // Set various HTTP headers to help protect application
  }
}

export default new App().app;
