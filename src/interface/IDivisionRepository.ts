import Division from '../db/models/division';

export interface IDivisionRepository {
  findById(id: number): Promise<Division | null>;
}
