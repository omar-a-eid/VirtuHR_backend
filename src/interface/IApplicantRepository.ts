import Applicant from '../db/models/applicant';
import { Transaction } from 'sequelize';
export interface IApplicantRepository {
  getAll(): Promise<Applicant[]>;
  getById(id: number): Promise<Applicant | null>;
  add(applicantData: Partial<Applicant>): Promise<Applicant>;
  update(
    id: number,
    applicant_status: string,
    options: { transaction?: Transaction },
  ): Promise<void>;
  delete(id: number, softDelete?: boolean): Promise<number>;
}
