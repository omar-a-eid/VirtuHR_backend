import Employee from '../db/models/employee';
import EmployeeRepository from '../repositories/EmployeeRepository';
import BaseService from './baseService';

export default class EmployeeService extends BaseService<Employee> {
  private employeeRepository: EmployeeRepository;

  constructor(employeeRepository: EmployeeRepository) {
    super(Employee);
    this.employeeRepository = employeeRepository;
  }

  public async getAll(): Promise<Employee[]> {
    return this.employeeRepository.getAll();
  }

  public async getById(employeeId: number): Promise<Employee | null> {
    return this.employeeRepository.getById(employeeId);
  }

  public async findByEmail(email: string): Promise<Employee | null> {
    return await this.employeeRepository.findByEmail(email);
  }

  public async getLoggedIn(employeeId: number): Promise<Employee | null> {
    return await this.employeeRepository.getLoggedIn(employeeId);
  }
}
