import { Request, Response } from 'express';
import JobPostingService from '../services/jobPostingService';
import jobPostingSchema from './jobPostingSchema';
// Get all job postings
export const getAllJobPostings = async (req: Request, res: Response) => {
  try {
    const jobPostings = await JobPostingService.getAllJobPostings();
    if (jobPostings.length > 0) {
      // console.log(jobPostings);
      return res.json(jobPostings);
    } else {
      return res.status(404).json({ message: 'No JobPostings Found' });
    }
  } catch (error) {
    console.log('Error fetching all jobPostings', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get job posting by ID
export const getJobPostingById = async (req: Request, res: Response) => {
  const jobPostingId = parseInt(req.params.id, 10);
  if (isNaN(jobPostingId)) {
    return res.status(400).json({ error: 'ID entered is not a number' });
  }
  try {
    const jobPosting = await JobPostingService.getJobPostingById(jobPostingId);

    if (jobPosting) {
      return res.json(jobPosting);
    } else {
      return res
        .status(404)
        .json({ message: `Job posting with ID ${jobPostingId} not found` });
    }
  } catch (error) {
    console.error(`Error fetching job posting with ID ${jobPostingId}:`, error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Create a new job posting

export const createJobPosting = async (req: Request, res: Response) => {
  try {
    const { error, value } = jobPostingSchema.validate(req.body, {
      abortEarly: false,
    });

    if (error) {
      return res.status(400).json({ errors: error.details });
    }

    // console.log('Validated data:', value); // Log the validated data
 
    const newJobPosting = await JobPostingService.addJobPosting(value);

    if (newJobPosting) {
      // console.log('New job posting created:', newJobPosting);
      return res.status(201).json(newJobPosting);
    } else {
      // console.error('Failed to create new job posting');
      return res.status(500).json({ error: 'Failed to create new jobPosting' });
    }
  } catch (error) {
    // console.error('Error creating job posting:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Update an existing job posting
export const updateJobPosting = async (req: Request, res: Response) => {
  const jobPostingId = parseInt(req.params.id);
  if (isNaN(jobPostingId)) {
    return res.status(400).json({ error: 'ID entered is not a number' });
  }

  const { error, value } = jobPostingSchema.validate(req.body, {
    abortEarly: false,
  });
  if (error) {
    return res.status(400).json({ errors: error.details });
  }

  try {
    await JobPostingService.updateJobPosting(jobPostingId, value);
    return res
      .status(200)
      .json({ message: 'Job posting updated successfully' });
  } catch (error) {
    console.error(`Error updating job posting with ID ${jobPostingId}:`, error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Delete a job posting
export const deleteJobPosting = async (req: Request, res: Response) => {
  const jobPostingId = parseInt(req.params.id);
  if (isNaN(jobPostingId)) {
    return res.status(400).json({ error: 'ID entered is not a number' });
  }
  try {
    await JobPostingService.deleteJobPosting(jobPostingId);
    return res.status(200).json({
      message: `Job posting with ID ${jobPostingId} deleted successfully`,
    });
  } catch (error) {
    console.error(`Error deleting job posting with ID ${jobPostingId}:`, error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};
