import Employee from '../db/models/employee';

export interface IEmployeeRepository {
  getAll(): Promise<Employee[]>;
  getById(id: number): Promise<Employee | null>;
  add(employeeData: Partial<Employee>): Promise<Employee>;
  findByEmail(email: string): Promise<Employee | null>;
  findByFullName(firstName: string, lastName: string): Promise<Employee | null>;
  update(id: number, employee: Partial<Employee>): Promise<void>;
  delete(id: number, softDelete?: boolean): Promise<number>;
}

export interface Employees {
  employees: Employee[];
  count: number;
}
