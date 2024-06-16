import JobPosting from '../db/models/jobposting';
import JobPostingRepository from '../repositories/JobPosting';

class JobPostingService {
  async getAllJobPostings(): Promise<JobPosting[]> {
    return await JobPostingRepository.getAll();
  }

  async getJobPostingById(id: number): Promise<JobPosting | null> {
    return await JobPostingRepository.getById(id);
  }

  async addJobPosting(jobPosting: JobPosting): Promise<JobPosting | null> {
    try {
      return await JobPostingRepository.add(jobPosting);
    } catch (error) {
      console.error('Error creating job posting:', error);
      return null;
    }
  }

  async updateJobPosting(id: number, jobPosting: JobPosting): Promise<void> {
    await JobPostingRepository.update(id, jobPosting);
  }

  async deleteJobPosting(id: number): Promise<void> {
    await JobPostingRepository.delete(id);
  }
}

export default new JobPostingService();
