import Assessment from '../db/models/assessment';
import AssessmentRepository from '../repositories/AssessmentRepository';
import BaseService from './baseService';

export default class AssessmentService extends BaseService<Assessment> {
  private assessmentRepository: AssessmentRepository;

  constructor(assessmentRepository: AssessmentRepository) {
    super(Assessment);
    this.assessmentRepository = assessmentRepository;
  }
}
