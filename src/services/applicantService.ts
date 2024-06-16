import ApplicantRepository from '../repositories/ApplicantRepository';
import Applicant from '../db/models/applicant';
import sequelize from '../config/database';

class ApplicantService {
  //Get all Applicants
  async getAllApplicants(): Promise<Applicant[]> {
    try {
      const applicants = await ApplicantRepository.getAll();
      return applicants;
    } catch (error) {
      console.log('Error fetching applicants:', error);
      throw new Error('Failed to fetch applicants');
    }
  }

  //Add New Applicant
  async addApplicant(applicantData: Applicant): Promise<Applicant | null> {
    try {
      const newApplicant = await ApplicantRepository.add(applicantData);
      return newApplicant;
    } catch (error) {
      console.log('Error creating applicant:', error);
      throw new Error('Failed to create applicant');
    }
  }

  // Get Applicant by ID
  async getApplicantById(id: number): Promise<Applicant | null> {
    try {
      const applicant = await ApplicantRepository.getById(id);
      return applicant;
    } catch (error) {
      console.log(`Error fetching applicant with ID ${id}:`, error);
      throw new Error(`Failed to fetch applicant with ID ${id}`);
    }
  }

  //Update Applicant Status
  async updateApplicant(id: number, applicant_status: string): Promise<void> {
    let transaction;
    try {
      transaction = await sequelize.transaction(); // Start a transaction

      await ApplicantRepository.update(id, applicant_status, { transaction });

      await transaction.commit(); // Commit the transaction if everything is successful
    } catch (error) {
      if (transaction) await transaction.rollback(); // Rollback the transaction on error
      console.log(`Error updating applicant status for ID ${id}:`, error);
      throw new Error(`Failed to update applicant status for ID ${id}`);
    }
  }

  async deleteApplicant(id: number, softDelete: boolean): Promise<number> {
    try {
      const deletedCount = await ApplicantRepository.delete(id, softDelete);
      return deletedCount;
    } catch (error) {
      console.log('Error deleting applicant:', error);
      throw new Error(`Failed to delete applicant with ID ${id}`);
    }
  }
}

export default new ApplicantService();
