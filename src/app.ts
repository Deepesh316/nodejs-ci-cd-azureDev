// contains basic express configuration

import bodyParser from "body-parser";
import cors from "cors";
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
    this.app.use(cors()); // Enables cors
  }
}

export default new App().app;
