import bodyParser from 'body-parser';
import cors from 'cors';
import 'dotenv/config';
import express, { Application } from 'express';
import jobPostingRouters from './routes/jobPostingRouters';
import applicantRouters from './routes/applicantRouters';
import './db/models/index';
import departmentRouters from './routes/departmentRouters';
import employeeRouters from './routes/employeeRouters';
import terminationRouters from './routes/terminationRouters';
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
    this.app.use('/api', jobPostingRouters);
    this.app.use('/api', applicantRouters);
    this.app.use('/api', employeeRouters);
    this.app.use('/api', departmentRouters);
    this.app.use('/api', terminationRouters);
  }
}

export default new App().app;
