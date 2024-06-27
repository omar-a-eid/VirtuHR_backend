import Report from '../db/models/report';
import ReportRepository from '../repositories/ReportRepository';
import BaseService from './baseService';

export default class ReportService extends BaseService<Report> {
  private reportRepository: ReportRepository;

  constructor(reportRepository: ReportRepository) {
    super(Report);
    this.reportRepository = reportRepository;
  }

  async getAllReports() {
    return await this.reportRepository.getAllReports();
  }

  async getReportById(id: number) {
    return await this.reportRepository.getReportById(id);
  }

  async createReport(data: Partial<Report>) {
    return await this.reportRepository.createReport(data);
  }
}
