// repositories/AssessmentRepository.ts
import Assessment from '../db/models/assessment';
import BaseRepository from './BaseRepository';

export default class AssessmentRepository extends BaseRepository<Assessment> {
  constructor() {
    super(Assessment);
  }

  public async getAssessmentStartingToday(today: string) {
    return await Assessment.findAll({
      where: { start_date: today },
    });
  }
}
