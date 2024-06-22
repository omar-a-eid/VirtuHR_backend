import Department from '../db/models/department';

// IDepartmentRepository.ts
export interface IDepartmentRepository {
  findById(id: number): Promise<Department | null>;
}
