import DepartmentRepository from '../repositories/DepartmentRepository';

class DepartmentService {
  async getAllDepartments() {
    return await DepartmentRepository.getAll();
  }

  async getDepartmentById(id: number) {
    return await DepartmentRepository.getById(id);
  }

  async createDepartment(departmentData: any) {
    return await DepartmentRepository.create(departmentData);
  }

  async createDepartments(departmentsData: any[]) {
    return await DepartmentRepository.createMany(departmentsData);
  }

  async updateDepartment(id: number, updateData: any) {
    return await DepartmentRepository.update(id, updateData);
  }

  async deleteDepartment(id: number) {
    return await DepartmentRepository.delete(id);
  }

  async getEmployeesOfDepartment(id: number) {
    return await DepartmentRepository.getAllEmployees(id);
  }
}

export default new DepartmentService();
