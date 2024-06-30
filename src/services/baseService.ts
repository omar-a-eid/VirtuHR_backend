import { Model, ModelStatic } from 'sequelize';
import BaseRepository from '../repositories/BaseRepository';

export default class BaseService<T extends Model> {
  private repository: BaseRepository<T>;

  constructor(model: ModelStatic<T>) {
    this.repository = new BaseRepository<T>(model);
  }

  async getAll(options?: any): Promise<T[]> {
    return await this.repository.getAll(options);
  }

  async getById(id: number, options?: any): Promise<T | null> {
    return await this.repository.getById(id, options);
  }

  async create(data: any, options?: any): Promise<T> {
    return await this.repository.create(data, options);
  }

  async update(id: number, data: any, options?: any): Promise<[number, T[]]> {
    return await this.repository.update(id, data, options);
  }

  async delete(id: number, options?: any): Promise<number> {
    return await this.repository.delete(id, options);
  }
}
