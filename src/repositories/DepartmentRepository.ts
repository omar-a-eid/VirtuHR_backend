import Department from '../db/models/department';
import { IDepartmentRepository } from '../interface/IDepartmentRepository';

class DepartmentRepository implements IDepartmentRepository {
  async findById(id: number): Promise<Department | null> {
    return Department.findByPk(id);
  }
}
export default new DepartmentRepository();
