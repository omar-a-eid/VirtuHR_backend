import { Model } from 'sequelize';

export default interface IRepository<T extends Model> {
  getAll(): Promise<T[]>;
  getById(id: number): Promise<T | null>;
  create(data: any): Promise<T>;
  update(id: number, data: any): Promise<[number, T[]]>;
  delete(id: number): Promise<number>;
}
