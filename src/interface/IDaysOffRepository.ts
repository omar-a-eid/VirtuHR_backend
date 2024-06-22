import DaysOff from '../db/models/daysoff';

export interface IDaysOffRepository {
  findById(id: number): Promise<DaysOff | null>;
}
