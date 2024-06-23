import Employee from '../db/models/employee';
import {
  Employees,
  IEmployeeRepository,
} from '../interface/IEmployeeRepostory';

class EmployeeRepository implements IEmployeeRepository {
  async getAll(): Promise<Employee[]> {
    return Employee.findAll({});
  }

  async getById(id: number): Promise<Employee | null> {
    return Employee.findByPk(id);
  }
  async add(employeeData: Partial<Employee>): Promise<Employee> {
    return Employee.create(employeeData);
  }

  async update(id: number, employee: Partial<Employee>): Promise<void> {
    await Employee.update(employee, { where: { id } });
  }

  async delete(id: number, softDelete: boolean = true): Promise<number> {
    if (softDelete) {
      return await Employee.destroy({ where: { id } }); // Soft delete
    } else {
      return await Employee.destroy({ where: { id }, force: true }); // Hard delete
    }
  }

  // to get -> Employee by Position with query parameter position=(Manager)
  async getByPosition(
    position: string | null,
    name: string | null,
  ): Promise<Employees> {
    const query: any = { where: {} };
    if (name !== '') {
      const firstName = name?.split(' ')[0] ?? '';
      const lastName = name?.split(' ')[1] ?? '';
      query.where.firstName = firstName;
      if (lastName !== '') {
        query.where.lastName = lastName;
      }
    }
    if (position !== '') {
      query.where.position = position;
    }
    const employees: Employees = {
      employees: [],
      count: 0,
    };
    const { count, rows } = await Employee.findAndCountAll(query);
    employees.employees = rows;
    employees.count = count;
    return employees;
  }
}

export default new EmployeeRepository();
