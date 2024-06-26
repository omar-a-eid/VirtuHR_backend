// import Employee from '../db/models/employee';
// import BaseRepository from '../repositories/BaseRepository';

// interface Employees {
//   employees: Employee[];
//   count: number;
// }
// export default class EmployeeRepository extends BaseRepository<Employee> {
//   constructor() {
//     super(Employee);
//   }

//   // to get -> Employee by Position with query parameter position=(Manager)
//   async getByPosition(
//     position: string | null,
//     name: string | null,
//   ): Promise<Employees> {
//     const query: any = { where: {} };
//     if (name !== '') {
//       const firstName = name?.split(' ')[0] ?? '';
//       const lastName = name?.split(' ')[1] ?? '';
//       query.where.firstName = firstName;
//       if (lastName !== '') {
//         query.where.lastName = lastName;
//       }
//     }
//     if (position !== '') {
//       query.where.position = position;
//     }
//     const employees: Employees = {
//       employees: [],
//       count: 0,
//     };
//     const { count, rows } = await Employee.findAndCountAll(query);
//     employees.employees = rows;
//     employees.count = count;
//     return employees;
//   }
// }
// import { Model, ModelStatic } from 'sequelize';
// import BaseRepository from '../repositories/BaseRepository';

// export default class BaseService<T extends Model> {
//   private repository: BaseRepository<T>;

//   constructor(model: ModelStatic<T>) {
//     this.repository = new BaseRepository<T>(model);
//   }

//   async getAll(): Promise<T[]> {
//     return await this.repository.getAll();
//   }

//   async getById(id: number): Promise<T | null> {
//     return await this.repository.getById(id);
//   }

//   async create(data: any): Promise<T> {
//     return await this.repository.create(data);
//   }

//   async update(id: number, data: any): Promise<[number, T[]]> {
//     return await this.repository.update(id, data);
//   }

//   async delete(id: number): Promise<number> {
//     return await this.repository.delete(id);
//   }
// }

import { Model, ModelStatic } from 'sequelize';
import BaseRepository from '../repositories/BaseRepository';

export default class BaseService<T extends Model> {
  private repository: BaseRepository<T>;

  constructor(model: ModelStatic<T>) {
    this.repository = new BaseRepository<T>(model);
  }

  async getAll(): Promise<T[]> {
    return await this.repository.getAll();
  }

  async getById(id: number): Promise<T | null> {
    return await this.repository.getById(id);
  }

  async create(data: any): Promise<T> {
    return await this.repository.create(data);
  }

  async update(id: number, data: any): Promise<[number, T[]]> {
    return await this.repository.update(id, data);
  }

  async delete(id: number): Promise<number> {
    return await this.repository.delete(id);
  }
}
