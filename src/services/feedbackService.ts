import Feedback from '../db/models/feedback';
import FeedbackRepository from '../repositories/FeedbackRepository';
import BaseService from './baseService';

export default class FeedbackService extends BaseService<Feedback> {
  private feedbackRepository: FeedbackRepository;

  constructor(feedbackRepository: FeedbackRepository) {
    super(Feedback);
    this.feedbackRepository = feedbackRepository;
  }
}
