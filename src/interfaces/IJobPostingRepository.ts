import jobPosting from '../db/models/jobposting';

export default interface IJobPostingRepository {
  getAll(): Promise<jobPosting[]>;
  getById(id: number): Promise<jobPosting | null>;
  add(jobPosting: jobPosting): Promise<jobPosting>;
  update(id: number, jobPosting: Partial<jobPosting>): Promise<void>;
  delete(id: number, softDelete?: boolean): Promise<number>;
}
