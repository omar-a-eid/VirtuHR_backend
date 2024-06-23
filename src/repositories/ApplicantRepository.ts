// repositories/ApplicantRepository.ts

import Applicant from '../db/models/applicant';
import { IApplicantRepository } from '../interface/IApplicantRepository';
import { Transaction } from 'sequelize';

class ApplicantRepository implements IApplicantRepository {
  async getAll(): Promise<Applicant[]> {
    return Applicant.findAll();
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

  async updateCV(applicantId: number, cvPath: string): Promise<void> {
    try {
      const applicant = await Applicant.findByPk(applicantId);
      if (applicant) {
        applicant.cvPath = cvPath;
        await applicant.save();
      } else {
        throw new Error(`Applicant with ID ${applicantId} not found`);
      }
    } catch (error) {
      console.log(
        `Error updating CV path for applicant ID ${applicantId}:`,
        error,
      );
      throw new Error(
        `Failed to update CV path for applicant ID ${applicantId}`,
      );
    }
  }
}

export default new ApplicantRepository();
