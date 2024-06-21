import db from '../db/models';
class TerminationRepository {
  async getAllTerminations() {
    return db.Termination.findAll({
      include: db.Employee,
    });
  }
}

export default new TerminationRepository();
