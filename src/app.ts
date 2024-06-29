import bodyParser from 'body-parser';
import cors from 'cors';
import 'dotenv/config';
import express, { Application, Request, Response } from 'express';
import './db/models/index';
import attendenceRouters from './routes/AttendenceRouters';
import applicantRouters from './routes/applicantRouters';
import authRouters from './routes/authRouters';
import departmentRouters from './routes/departmentRouters';
import employeeRouters from './routes/employeeRouters';
import goalRouters from './routes/goalRouters';
import jobPostingRouters from './routes/jobPostingRouters';
import leaveRequestRouters from './routes/leaveRequestRouters';
import reportRouter from './routes/reportRouters';
import terminationRouters from './routes/terminationRouters';

import multer from 'multer';
import announcementRouter from './routes/announcementRouter';
import companyRouters from './routes/companyRouters';
// Create a Multer instance with a destination folder for file uploads
const upload = multer({ dest: 'uploads/' });

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
    // Define routes
    this.app.use('/api', jobPostingRouters);
    this.app.use('/api', applicantRouters);
    this.app.use('/api', employeeRouters);
    this.app.use('/api', departmentRouters);
    this.app.use('/api', terminationRouters);
    this.app.use('/api', leaveRequestRouters);
    this.app.use('/api', reportRouter);
    this.app.use('/api', announcementRouter);
    this.app.use('/api', goalRouters);

    this.app.use('/api', authRouters);
    this.app.use('/api', attendenceRouters);
    this.app.use('/api', companyRouters);

    // Define a POST route for file uploads using Multer middleware
    this.app.post(
      '/upload',
      upload.single('file'),
      (req: Request, res: Response) => {
        if (!req.file) {
          return res.status(400).json({ error: 'No file uploaded' });
        }
        res.json({ message: 'File uploaded successfully' });
      },
    );
  }
}

export default new App().app;
