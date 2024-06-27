import JobPosting from '../db/models/jobposting';
import BaseRepository from './BaseRepository';

export default class JobPostingRepository extends BaseRepository<JobPosting> {
  constructor() {
    super(JobPosting);
  }
}
