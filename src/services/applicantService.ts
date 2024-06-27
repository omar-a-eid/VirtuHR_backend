import Applicant from '../db/models/applicant';
import ApplicantRepository from '../repositories/ApplicantRepository';
import BaseService from './baseService';

export default class ApplicantService extends BaseService<Applicant> {
  private applicantRepository: ApplicantRepository;

  constructor(applicantRepository: ApplicantRepository) {
    super(Applicant);
    this.applicantRepository = applicantRepository;
  }
  async softDelete(id: number): Promise<number> {
    return await this.applicantRepository.softDelete(id);
  }
  async updateApplicantStatus(
    id: number,
    status: string,
  ): Promise<[number, Applicant[]]> {
    return await this.update(id, { applicantStatus: status });
  }
}
