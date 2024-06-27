import bodyParser from 'body-parser';
import cors from 'cors';
import 'dotenv/config';
import express, { Application } from 'express';
import './db/models/index';
import attendenceRouters from './routes/AttendenceRouters';
import authRouters from './routes/authRouters';
import departmentRouters from './routes/departmentRouters';
import employeeRouters from './routes/employeeRouters';
import leaveRequestRouters from './routes/leaveRequestRouters';
import reportRouter from './routes/reportRouters';
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
    this.app.use('/api', employeeRouters);
    this.app.use('/api', departmentRouters);
    this.app.use('/api', terminationRouters);
    this.app.use('/api', leaveRequestRouters);
    this.app.use('/api', reportRouter);

    this.app.use('/api', authRouters);
    this.app.use('/attendence', attendenceRouters);
  }
}

export default new App().app;
