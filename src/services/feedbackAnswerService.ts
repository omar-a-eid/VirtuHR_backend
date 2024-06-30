import FeedbackAnswer from '../db/models/feedbackanswer';
import FeedbackAnswerRepository from '../repositories/FeedbackAnswerRepository';
import BaseService from './baseService';

export default class FeedbackAnswerService extends BaseService<FeedbackAnswer> {
  private feedbackAnswerRepository: FeedbackAnswerRepository;

  constructor(feedbackAnswerRepository: FeedbackAnswerRepository) {
    super(FeedbackAnswer);
    this.feedbackAnswerRepository = feedbackAnswerRepository;
  }

  public async getFeedbackAnswerForEmployee(id: number) {
    return await this.feedbackAnswerRepository.getFeedbackAnswerForEmployee(id);
  }
}
