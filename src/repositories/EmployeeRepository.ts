import Company from '../db/models/company';
import DaysOff from '../db/models/daysoff';
import Employee from '../db/models/employee';
import BaseRepository from './BaseRepository';

interface Employees {
  employees: Employee[];
  count: number;
}
export default class EmployeeRepository extends BaseRepository<Employee> {
  constructor() {
    super(Employee);
  }

  public async getAll(): Promise<Employee[]> {
    return await Employee.findAll({
      attributes: [
        'id',
        'firstName',
        'lastName',
        'position',
        'location',
        'email',
        'phone',
        'employmentType',
        'hireDate',
        'salary',
        'departmentId',
        'dateOfBirth',
        'createdAt',
        'gender',
        'managerId',
      ],
    });
  }

  public async getById(employeeId: number): Promise<Employee | null> {
    return Employee.findByPk(employeeId);
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

  public async findByEmail(email: string): Promise<Employee | null> {
    return await Employee.findOne({ where: { email } });
  }

  public async getLoggedIn(employeeId: number): Promise<Employee | null> {
    return await Employee.findByPk(employeeId, {
      include: [
        {
          model: Company,
          as: 'company',
        },
        {
          model: DaysOff,
          as: 'daysOff',
        },
      ],
    });
  }
}
