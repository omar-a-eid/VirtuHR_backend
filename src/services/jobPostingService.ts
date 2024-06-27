import JobPosting from '../db/models/jobposting';
import JobPostingRepository from '../repositories/JobPostingRepository';
import BaseService from './baseService';
export default class JobPostingService extends BaseService<JobPosting> {
  private jobPostingRepository: JobPostingRepository;

  constructor(jobPostingRepository: JobPostingRepository) {
    super(JobPosting);
    this.jobPostingRepository = jobPostingRepository;
  }
}
