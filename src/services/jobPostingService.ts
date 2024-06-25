import JobPosting from '../db/models/jobposting';
import JobPostingRepository from '../repositories/JobPostingRepository';
import BaseService from './baseService';
export default class JobPostingService extends BaseService<JobPosting> {
  constructor(jobPostingRepository: JobPostingRepository) {
    super(JobPosting);
    jobPostingRepository = jobPostingRepository;
  }
}
