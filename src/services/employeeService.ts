import EmployeeRepository from '../repositories/EmployeeRepository';
import Employee from '../db/models/employee';

class EmployeeService {
  /*---------------------------UpdateEmployee-------------------------*/
  async getAllEmployees(): Promise<Employee[]> {
    const employees = await EmployeeRepository.getAll();
    return employees;
  }
  /*---------------------------GetEmployeeById-------------------------*/
  async getEmployeesById(id: number): Promise<Employee | null> {
    const employees = await EmployeeRepository.getById(id);
    return employees;
  }
  /*---------------------------AddNewEmployee-------------------------*/
  async AddEmployee(employee: Employee): Promise<Employee | null> {
    try {
      const newEmployee = await EmployeeRepository.add(employee);
      return newEmployee;
    } catch (error) {
      console.error('Error creating employee:', error);
      return null;
    }
  }
  /*---------------------------UpdateEmployee-------------------------*/
  async UpdateEmployee(id: number, employee: Partial<Employee>): Promise<void> {
    await EmployeeRepository.update(id, employee);
  }
}
export default new EmployeeService();
