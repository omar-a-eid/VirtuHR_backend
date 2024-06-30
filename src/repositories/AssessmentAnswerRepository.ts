// repositories/AssessmentAnswerRepository.ts
import AssessmentAnswer from '../db/models/assessmentanswer';
import BaseRepository from './BaseRepository';

export default class AssessmentAnswerRepository extends BaseRepository<AssessmentAnswer> {
  constructor() {
    super(AssessmentAnswer);
  }

  async getAssessmentAnswers(id: number) {
    return await AssessmentAnswer.findAll({
      where: { assessment_id: id },
    });
  }

  async getAssessmentAnswersForEmployee(id: number, employeeId: number) {
    return await AssessmentAnswer.findAll({
      where: { assessment_id: id, recipient_id: employeeId },
    });
  }
}
