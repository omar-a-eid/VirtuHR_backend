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

  async delete(id: number, softDelete: boolean = true): Promise<number> {
    if (softDelete) {
      return await Employee.destroy({ where: { id } }); // Soft delete
    } else {
      return await Employee.destroy({ where: { id }, force: true }); // Hard delete
    }
  }
}

export default new EmployeeRepository();
