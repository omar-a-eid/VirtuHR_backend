import { Model, ModelStatic, WhereOptions } from 'sequelize';
import IRepository from '../interface/IRepository';

export default class BaseRepository<T extends Model> implements IRepository<T> {
  private model: ModelStatic<T>;

  constructor(model: ModelStatic<T>) {
    this.model = model;
  }

  public async getAll(options?: any): Promise<T[]> {
    return this.model.findAll(options) as Promise<T[]>;
  }

  public async getById(id: number, options?: any): Promise<T | null> {
    return this.model.findByPk(id, options) as Promise<T | null>;
  }

  public async create(data: any, options?: any): Promise<T> {
    return this.model.create(data, options) as Promise<T>;
  }

  public async update(
    id: number,
    data: any,
    options?: any,
  ): Promise<[number, T[]]> {
    const [, updatedRecords] = await this.model.update(data, {
      where: { id } as WhereOptions<any>,
      returning: true,
      ...options,
    });
    return [updatedRecords.length, updatedRecords as T[]];
  }

  public async delete(id: number, options?: any): Promise<number> {
    return this.model.destroy({
      where: { id } as WhereOptions<any>,
      ...options,
    });
  }
}
