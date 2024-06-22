import Department from '../db/models/department';
import DepartmentRepository from '../repositories/DepartmentRepository';
import BaseService from './baseService';

export default class DepartmentService extends BaseService<Department> {
  private departmentRepository: DepartmentRepository;

  constructor(departmentRepository: DepartmentRepository) {
    super(Department);
    this.departmentRepository = departmentRepository;
  }

  // Add any additional methods specific to DepartmentService if needed
  async getById(id: number) {
    return await this.departmentRepository.getByIdAll(id);
  }
}
