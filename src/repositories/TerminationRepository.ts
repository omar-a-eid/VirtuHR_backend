import Employee from '../db/models/employee';
import Termination from '../db/models/termination';
import BaseRepository from './BaseRepository';

export default class TerminationRepository extends BaseRepository<Termination> {
  constructor() {
    super(Termination);
  }

  public async getAllTerminations() {
    return await Termination.findAll({
      include: Employee,
    });
  }
}
