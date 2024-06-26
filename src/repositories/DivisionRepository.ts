import Division from '../db/models/division';
import { IDivisionRepository } from '../interface/IDivisionRepository';

class DivisionRepository implements IDivisionRepository {
  async findById(id: number): Promise<Division | null> {
    return Division.findByPk(id);
  }
}

export default new DivisionRepository();
