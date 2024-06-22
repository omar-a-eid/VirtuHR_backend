import Department from '../db/models/department';
import Employee from '../db/models/employee';
import BaseRepository from './BaseRepository';

export default class DepartmentRepository extends BaseRepository<Department> {
  constructor() {
    super(Department);
  }

  // If you have additional methods specific to Department, you can add them here
  public async getByIdAll(id: number) {
    return Department.findByPk(id, {
      include: {
        model: Employee,
        as: 'departmentEmployees',
      },
    });
  }
}