import Applicant from '../db/models/applicant';
import { IApplicantRepository } from '../interface/IApplicantRepository';
import { Transaction } from 'sequelize';
import JobPosting from '../db/models/jobposting';
class ApplicantRepository implements IApplicantRepository {
  async getAll(): Promise<Applicant[]> {
    return Applicant.findAll({
      include: JobPosting,
    });
  }

  async getById(id: number): Promise<Applicant | null> {
    return Applicant.findByPk(id);
  }
  async add(applicantData: Partial<Applicant>): Promise<Applicant> {
    return Applicant.create(applicantData);
  }

  async update(
    id: number,
    applicant_status: string,
    options: { transaction?: Transaction },
  ): Promise<void> {
    await Applicant.update(
      { applicantStatus: applicant_status },
      { where: { id }, ...options },
    );
  }

  async delete(id: number, softDelete?: boolean | undefined): Promise<number> {
    if (softDelete) {
      return await Applicant.destroy({ where: { id } });
    } else {
      return await Applicant.destroy({ where: { id }, force: true });
    }
  }
}
export default new ApplicantRepository();
