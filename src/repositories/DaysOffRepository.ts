import DaysOff from '../db/models/daysoff';
import { IDaysOffRepository } from '../interface/IDaysOffRepository';

export class DaysOffRepository implements IDaysOffRepository {
  async findById(id: number): Promise<DaysOff | null> {
    return DaysOff.findByPk(id);
  }
}

export default new DaysOffRepository();
