import JobPosting from '../db/models/jobposting';
import IJobPostingRepository from '../interfaces/IJobPostingRepository';
class JobPostingRepository implements IJobPostingRepository {
  async getAll(): Promise<JobPosting[]> {
    return JobPosting.findAll();
  }

  async getById(id: number): Promise<JobPosting | null> {
    return JobPosting.findByPk(id);
  }
  async add(jobPostingData: Partial<JobPosting>): Promise<JobPosting> {
    return JobPosting.create(jobPostingData);
  }

  async update(id: number, jobPosting: Partial<JobPosting>): Promise<void> {
    await JobPosting.update(jobPosting, { where: { id } });
  }

  async delete(id: number, softDelete: boolean = true): Promise<number> {
    if (softDelete) {
      return await JobPosting.destroy({ where: { id } }); // Soft delete
    } else {
      return await JobPosting.destroy({ where: { id }, force: true }); // Hard delete
    }
  }

  // to get -> jobPosting by Position with query parameter position=(Manager)
}
export default new JobPostingRepository();
