import Department from '../db/models/department';
import Employee from '../db/models/employee';

class DepartmentRepository {
  async getAll() {
    return await Department.findAll();
  }

  async getById(id: number) {
    return await Department.findByPk(id);
  }

  async create(departmentData: any) {
    return await Department.create(departmentData);
  }

  async createMany(departmentsData: any[]) {
    return await Department.bulkCreate(departmentsData);
  }

  async update(id: number, updateData: any) {
    const department = await this.getById(id);
    if (!department) {
      throw new Error('Department not found');
    }
    return await department.update(updateData);
  }

  async delete(id: number) {
    const department = await this.getById(id);
    if (!department) {
      throw new Error('Department not found');
    }
    return await department.destroy();
  }

  async getAllEmployees(id: number) {
    return await Department.findByPk(id, {
      include: [{ model: Employee, as: 'departmentEmployees' }],
    });
  }
}

export default new DepartmentRepository();
