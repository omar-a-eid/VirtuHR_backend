import Termination from '../db/models/termination';
import Employee from '../db/models/employee';

class TerminationRepository {
  async getAllTerminations() {
    return Termination.findAll({
      include: [Employee],
    });
  }
}

export default new TerminationRepository();