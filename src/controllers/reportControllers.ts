import { Request, Response } from 'express';
import ReportRepository from '../repositories/ReportRepository';
import ReportService from '../services/reportService';

const reportRepository = new ReportRepository();
const reportService = new ReportService(reportRepository);

export default class ReportController {
  public static async getAllReports(req: Request, res: Response) {
    try {
      const reports = await reportService.getAllReports();
      res.status(200).json(reports);
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'An unknown error occurred' });
      }
    }
  }

  public static async getReportById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const report = await reportService.getReportById(Number(id));
      if (report) {
        res.status(200).json(report);
      } else {
        res.status(404).json({ error: 'Report not found' });
      }
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'An unknown error occurred' });
      }
    }
  }

  public static async createReport(req: Request, res: Response) {
    try {
      const reportData = req.body;
      const report = await reportService.createReport(reportData);
      res.status(201).json(report);
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'An unknown error occurred' });
      }
    }
  }
}
