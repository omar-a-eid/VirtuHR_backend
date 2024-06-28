import Goal from '../db/models/goal';
import BaseRepository from './BaseRepository';

export default class GoalRepository extends BaseRepository<Goal> {
  constructor() {
    super(Goal);
  }

  // If you have additional methods specific to Department, you can add them here
  public async getEmployeeGoals(id: number) {
    return await Goal.findAll({ where: { assignedTo: id } });
  }

  public async setAsComplete(id: number) {
    return await Goal.update({ isCompleted: true }, { where: { id } });
  }
}
