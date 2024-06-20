import { Model, ModelStatic } from 'sequelize';
import { BaseRepository } from '../repositories/BaseRepository';

export class BaseService<T extends Model> {
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
