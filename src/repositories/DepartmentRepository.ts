import Department from '../db/models/department';
import { BaseRepository } from './BaseRepository';

export class DepartmentRepository extends BaseRepository<Department> {
  constructor() {
    super(Department);
  }

  // If you have additional methods specific to Department, you can add them here
}
