import Department from '../db/models/department';
import DepartmentRepository from '../repositories/DepartmentRepository';
import BaseService from './baseService';

export default class DepartmentService extends BaseService<Department> {
  private departmentRepository: DepartmentRepository;

  constructor(departmentRepository: DepartmentRepository) {
    super(Department);
    this.departmentRepository = departmentRepository;
  }

  async getEmployees(id: number) {
    return await this.departmentRepository.getEmployees(id);
  }
}
