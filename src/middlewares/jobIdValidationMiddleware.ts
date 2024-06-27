import { Request, Response, NextFunction } from 'express';
import JobPosting from '../db/models/jobposting';

export const validateJobId = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const jobId = req.body.jobId || req.params.jobId;
  if (!jobId) {
    return res.status(400).json({ error: 'Job ID is required' });
  }

  try {
    const jobPosting = await JobPosting.findByPk(jobId);
    if (!jobPosting) {
      return res
        .status(400)
        .json({ error: `Job with ID ${jobId} does not exist` });
    }

    // Proceed to the next middleware/controller function
    next();
  } catch (error) {
    console.error('Error validating job ID:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};
