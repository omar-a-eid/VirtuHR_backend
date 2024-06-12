import Employee from '../db/models/employee';

export interface IEmployeeRepository {
  getAll(): Promise<Employee[]>;
  getById(id: number): Promise<Employee | null>;
  add(employee: Employee): Promise<Employee>;
  update(id: number, employee: Partial<Employee>): Promise<void>;
  delete(id: number, softDelete?: boolean): Promise<number>;
}
