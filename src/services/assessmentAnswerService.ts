import AssessmentAnswer from '../db/models/assessmentanswer';
import AssessmentAnswerRepository from '../repositories/AssessmentAnswerRepository';
import BaseService from './baseService';

export default class AssessmentAnswerService extends BaseService<AssessmentAnswer> {
  private assessmentAnswerRepository: AssessmentAnswerRepository;

  constructor(assessmentAnswerRepository: AssessmentAnswerRepository) {
    super(AssessmentAnswer);
    this.assessmentAnswerRepository = assessmentAnswerRepository;
  }

  async getAssessmentAnswers(id: number) {
    return await this.assessmentAnswerRepository.getAssessmentAnswers(id);
  }

  async getAssessmentAnswersForEmployee(id: number, employeeId: number) {
    return await this.assessmentAnswerRepository.getAssessmentAnswersForEmployee(
      id,
      employeeId,
    );
  }
}
