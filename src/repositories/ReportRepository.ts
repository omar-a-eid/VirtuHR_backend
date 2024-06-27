import Report from '../db/models/report';
import BaseRepository from './BaseRepository';

export default class ReportRepository extends BaseRepository<Report> {
  constructor() {
    super(Report);
  }

  public async getAllReports() {
    return await Report.findAll();
  }

  public async getReportById(id: number) {
    return await Report.findByPk(id);
  }

  public async createReport(data: Partial<Report>) {
    return await Report.create(data);
  }
}
