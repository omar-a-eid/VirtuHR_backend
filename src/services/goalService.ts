import Goal from '../db/models/goal';
import GoalRepository from '../repositories/GoalRepository';
import BaseService from './baseService';

export default class GoalService extends BaseService<Goal> {
  private goalRepository: GoalRepository;

  constructor(goalRepository: GoalRepository) {
    super(Goal);
    this.goalRepository = goalRepository;
  }

  async getEmployeeGoals(id: number) {
    return await this.goalRepository.getEmployeeGoals(id);
  }

  async setAsComplete(id: number) {
    return await this.goalRepository.setAsComplete(id);
  }
}
