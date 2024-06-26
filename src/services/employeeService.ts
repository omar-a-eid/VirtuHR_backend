// import EmployeeRepository from '../repositories/EmployeeRepository';
// import Employee from '../db/models/employee';

// class EmployeeService {
//   /*---------------------------UpdateEmployee-------------------------*/
//   async getAllEmployees(): Promise<Employee[]> {
//     const employees = await EmployeeRepository.getAll();
//     return employees;
//   }
//   /*---------------------------GetEmployeeById-------------------------*/
//   async getEmployeesById(id: number): Promise<Employee | null> {
//     const employees = await EmployeeRepository.getById(id);
//     return employees;
//   }
//   /*---------------------------AddNewEmployee-------------------------*/
//   async AddEmployee(employee: Employee): Promise<Employee | null> {
//     try {
//       const newEmployee = await EmployeeRepository.add(employee);
//       return newEmployee;
//     } catch (error) {
//       console.error('Error creating employee:', error);
//       return null;
//     }
//   }
//   /*---------------------------UpdateEmployee-------------------------*/
//   async UpdateEmployee(id: number, employee: Partial<Employee>): Promise<void> {
//     await EmployeeRepository.update(id, employee);
//   }
// }
// export default new EmployeeService();

import Employee from '../db/models/employee';
import EmployeeRepository from '../repositories/EmployeeRepository';
import BaseService from './BaseService';

export default class EmployeeService extends BaseService<Employee> {
  private employeeRepository: EmployeeRepository;

  constructor(employeeRepository: EmployeeRepository) {
    super(Employee);
    this.employeeRepository = employeeRepository;
  }
  public async getById(employeeId: number): Promise<Employee | null> {
    return this.employeeRepository.getById(employeeId);
  }
}
