// controllers/applicantController.ts

import { Request, Response } from 'express';
import applicantSchema from './applicantValidationSchema';
import applicantService from '../services/applicantService';

// Get All Applicants
export const getAllApplicants = async (req: Request, res: Response) => {
  try {
    const applicants = await applicantService.getAllApplicants();
    if (applicants.length > 0) {
      console.log(applicants);
      return res.json(applicants);
    } else {
      return res.status(404).json({ message: 'No Applicants Found' });
    }
  } catch (error) {
    console.log('Error fetching all applicants', error);
    return res.status(500).json({ error: 'internal server error' });
  }
};

// Get Applicant by ID
export const getApplicantById = async (req: Request, res: Response) => {
  const applicantId = parseInt(req.params.id);

  // Validate applicant ID
  if (isNaN(applicantId)) {
    return res.status(400).json({ error: 'ID entered is not a number' });
  }

  try {
    const applicant = await applicantService.getApplicantById(applicantId);

    if (!applicant) {
      return res
        .status(404)
        .json({ error: `Applicant with ID ${applicantId} not found` });
    }

    return res.status(200).json(applicant);
  } catch (error) {
    console.log(`Error fetching applicant with ID ${applicantId}:`, error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

// Update Applicant
export const updateApplicant = async (req: Request, res: Response) => {
  const applicantId = parseInt(req.params.id);
  const applicant_status = req.body.applicantStatus;
  console.log(applicant_status);

  // Validate applicant ID
  if (isNaN(applicantId)) {
    return res.status(400).json({ error: 'ID entered is not a number' });
  }

  try {
    const existingApplicant =
      await applicantService.getApplicantById(applicantId);
    if (!existingApplicant) {
      return res
        .status(404)
        .json({ error: `Applicant with ID ${applicantId} not found` });
    }

    const allowedStatuses = ['applied', 'interviewing', 'hired', 'rejected'];
    if (!allowedStatuses.includes(applicant_status)) {
      return res.status(400).json({
        error: `Invalid applicant status '${applicant_status}'. Status must be one of: 'applied', 'interviewing', 'hired', 'rejected'`,
      });
    }
    await applicantService.updateApplicant(applicantId, applicant_status);
    return res
      .status(200)
      .json({ message: 'Applicant status updated successfully' });
  } catch (error) {
    console.log(
      `Error updating applicant status for ID ${applicantId}:`,
      error,
    );
    return res.status(500).json({ error: 'Internal server error' });
  }
};

// Add new applicant
export const addNewApplicant = async (req: Request, res: Response) => {
  try {
    const { error, value } = applicantSchema.validate(req.body);
    if (error) {
      return res
        .status(400)
        .json({ error: error.details.map((x) => x.message).join(', ') });
    }

    const newApplicant = await applicantService.addApplicant(value);
    if (newApplicant) {
      return res.status(200).json({ newApplicant });
    } else {
      return res.status(500).json({ error: 'Failed to create new applicant' });
    }
  } catch (error) {
    console.log('Error adding new applicant:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

// Delete applicant
export const deleteApplicant = async (req: Request, res: Response) => {
  try {
    const applicantId = parseInt(req.params.id);
    if (isNaN(applicantId)) {
      return res.status(400).json({ error: 'ID entered is not a number' });
    }
    const softDelete = req.query.hard !== 'true';
    const deletedCount = await applicantService.deleteApplicant(
      applicantId,
      softDelete,
    );
    if (deletedCount === 0) {
      return res
        .status(404)
        .json({ message: `Applicant with ID ${applicantId} not found` });
    }
    const deleteType = softDelete ? 'soft' : 'hard';
    return res.status(200).json({
      message: `Applicant with ID ${applicantId} ${deleteType} deleted successfully`,
    });
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};
