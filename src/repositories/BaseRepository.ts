import { Model, ModelStatic, WhereOptions } from 'sequelize';
import { IRepository } from '../interface/IRepository';

export class BaseRepository<T extends Model> implements IRepository<T> {
  private model: ModelStatic<T>;

  constructor(model: ModelStatic<T>) {
    this.model = model;
  }

  public async getAll(): Promise<T[]> {
    return this.model.findAll() as Promise<T[]>;
  }

  public async getById(id: number): Promise<T | null> {
    return this.model.findByPk(id) as Promise<T | null>;
  }

  public async create(data: any): Promise<T> {
    return this.model.create(data) as Promise<T>;
  }

  public async update(id: number, data: any): Promise<[number, T[]]> {
    const [, updatedRecords] = await this.model.update(data, {
      where: { id } as WhereOptions<any>,
      returning: true,
    });
    return [updatedRecords.length, updatedRecords as T[]];
  }

  public async delete(id: number): Promise<number> {
    return this.model.destroy({
      where: { id } as WhereOptions<any>,
    });
  }
}
