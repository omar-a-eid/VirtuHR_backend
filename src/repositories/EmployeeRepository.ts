import Employee from '../db/models/employee';
import { IEmployeeRepository } from '../interface/IEmployeeRepostory';

class EmployeeRepository implements IEmployeeRepository {
  async getAll(): Promise<Employee[]> {
    return Employee.findAll();
  }

  async getById(id: number): Promise<Employee | null> {
    return Employee.findByPk(id);
  }

  //   async add(employee: Employee): Promise<Employee> {
  //     return Employee.create(employee);
  //   }

  //   async update(id: number, employee: Partial<Employee>): Promise<void> {
  //     await Employee.update(employee, { where: { id } });
  //   }

  async delete(id: number): Promise<number> {
    return await Employee.destroy({ where: { id }, force: true });
  }
}

export default new EmployeeRepository();
