// repositories/FeedbackAnswerRepository.ts
import Employee from '../db/models/employee';
import FeedbackAnswer from '../db/models/feedbackanswer';
import BaseRepository from './BaseRepository';

export default class FeedbackAnswerRepository extends BaseRepository<FeedbackAnswer> {
  constructor() {
    super(FeedbackAnswer);
  }

  public async getFeedbackAnswerForEmployee(id: number) {
    return await FeedbackAnswer.findAll({
      where: { employee_id: id },
      include: [
        {
          model: Employee,
          as: 'feedbackReviewer',
        },
      ],
    });
  }
}
