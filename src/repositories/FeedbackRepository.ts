// repositories/FeedbackRepository.ts
import Feedback from '../db/models/feedback';
import BaseRepository from './BaseRepository';

export default class FeedbackRepository extends BaseRepository<Feedback> {
  constructor() {
    super(Feedback);
  }

  public async getFeedbackStartingToday(today: string) {
    return await Feedback.findAll({
      where: { reminder: today },
    });
  }
}
