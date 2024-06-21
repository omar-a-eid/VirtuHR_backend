import bodyParser from 'body-parser';
import cors from 'cors';
import 'dotenv/config';
import express, { Application } from 'express';
import employeeRouters from './routes/employeeRouters';
import attendenceRouters from './routes/AttendenceRouters';

class App {
  public app: Application;

  constructor() {
    this.app = express();
    this.config();
    this.routes();
  }

  private config(): void {
    //#region Middleware
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use(cors());
    //#endregion
  }

  private routes(): void {
    //write all the routes here
    this.app.use('/api', employeeRouters);
    this.app.use('/attendence', attendenceRouters);
  }
}

export default new App().app;
