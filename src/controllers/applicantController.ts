import { Request, Response } from 'express';
import applicantSchema from './applicantValidationSchema';
import ApplicantService from '../services/applicantService';
import ApplicantRepository from '../repositories/ApplicantRepository';
import { log } from 'console';

const applicantRepository = new ApplicantRepository();
const applicantService = new ApplicantService(applicantRepository);

export default class applicantController {
  // Get All Applicants
  public static async getAllApplicants(
    req: Request,
    res: Response,
  ): Promise<void> {
    try {
      const applicants = await applicantService.getAll();
      if (applicants.length > 0) {
        console.log(applicants);
        res.json(applicants);
      } else {
        res.status(404).json({ message: 'No Applicants Found' });
      }
    } catch (error) {
      console.log('Error fetching all applicants', error);
      res.status(500).json({ error: 'internal server error' });
    }
  }

  // Get Applicant by ID
  public static async getApplicantById(
    req: Request,
    res: Response,
  ): Promise<void> {
    const applicantId = parseInt(req.params.id);

    // Validate applicant ID
    if (isNaN(applicantId)) {
      res.status(400).json({ error: 'ID entered is not a number' });
    }

    try {
      const applicant = await applicantService.getById(applicantId);

      if (!applicant) {
        res
          .status(404)
          .json({ error: `Applicant with ID ${applicantId} not found` });
      }

      res.status(200).json(applicant);
    } catch (error) {
      console.log(`Error fetching applicant with ID ${applicantId}:`, error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  // Update Applicant
  public static async updateApplicant(
    req: Request,
    res: Response,
  ): Promise<void> {
    const applicantId = parseInt(req.params.id);
    const applicantStatus = req.body.applicantStatus;

    // Validate applicant ID
    if (isNaN(applicantId)) {
      res.status(400).json({ error: 'ID entered is not a number' });
      return;
    }

    try {
      const existingApplicant = await applicantService.getById(applicantId);
      if (!existingApplicant) {
        res
          .status(404)
          .json({ error: `Applicant with ID ${applicantId} not found` });
        return;
      }

      const allowedStatuses = ['applied', 'interviewing', 'hired', 'rejected'];
      if (!allowedStatuses.includes(applicantStatus)) {
        res.status(400).json({
          error: `Invalid applicant status '${applicantStatus}'. Status must be one of: 'applied', 'interviewing', 'hired', 'rejected'`,
        });
        return;
      }

      await applicantService.updateApplicantStatus(
        applicantId,
        applicantStatus,
      );
      res
        .status(200)
        .json({ message: 'Applicant status updated successfully' });
    } catch (error) {
      console.log(
        `Error updating applicant status for ID ${applicantId}:`,
        error,
      );
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  // Add new applicant
  public static async addNewApplicant(
    req: Request,
    res: Response,
  ): Promise<void> {
    try {
      const { error, value } = applicantSchema.validate(req.body);
      if (error) {
        res
          .status(400)
          .json({ error: error.details.map((x) => x.message).join(', ') });
      }

      const newApplicant = await applicantService.create(value);
      if (newApplicant) {
        res.status(200).json({ newApplicant });
      } else {
        res.status(500).json({ error: 'Failed to create new applicant' });
      }
    } catch (error) {
      console.log('Error adding new applicant:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
  public static async softDeleteApplicant(
    req: Request,
    res: Response,
  ): Promise<void> {
    try {
      const applicantId = parseInt(req.params.id);
      if (isNaN(applicantId)) {
        res.status(400).json({ error: 'ID entered is not a number' });
      }
      const deletedCount = await applicantService.softDelete(applicantId);
      if (deletedCount === 0) {
        res
          .status(404)
          .json({ message: `Applicant with ID ${applicantId} not found` });
      }
      res.status(200).json({
        message: `Applicant with ID ${applicantId} soft deleted successfully`,
      });
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  // Delete applicant
  public static async deleteApplicant(
    req: Request,
    res: Response,
  ): Promise<void> {
    try {
      const applicantId = parseInt(req.params.id);
      if (isNaN(applicantId)) {
        res.status(400).json({ error: 'ID entered is not a number' });
      }
      const deletedCount = await applicantService.delete(applicantId);
      if (deletedCount === 0) {
        res
          .status(404)
          .json({ message: `Applicant with ID ${applicantId} not found` });
      }
      res.status(200).json({
        message: `Applicant with ID ${applicantId} hard deleted successfully`,
      });
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}
