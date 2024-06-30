// src/scheduler/index.ts
import cron from 'node-cron';
// import AssessmentRepository from '../repositories/AssessmentRepository';
import DepartmentRepository from '../repositories/DepartmentRepository';
import FeedbackRepository from '../repositories/FeedbackRepository';
import FeedbackGenerator from '../services/feedbackGenerator';

const departmentRepository = new DepartmentRepository();
const feedbackRepository = new FeedbackRepository();
// const assessmentRepository = new AssessmentRepository();
const feedbackGenerator = new FeedbackGenerator(departmentRepository);

// Schedule the job to run at midnight every day
cron.schedule('0 0 * * *', async () => {
  try {
    // Get all active review cycles starting today
    const today = new Date().toISOString().split('T')[0];
    // const assessments =
    //   await assessmentRepository.getAssessmentStartingToday(today);

    const feedbacks = await feedbackRepository.getFeedbackStartingToday(today);

    // for (const assessment of assessments) {
    //   await feedbackGenerator.generatePeerFeedbackRequests(
    //     cycle.id,
    //     cycle.departmentId,
    //   );
    // }

    for (const feedback of feedbacks) {
      await feedbackGenerator.generatePeerFeedbackRequests(
        feedback.id,
        cycle.departmentId,
      );
    }

    console.log('Feedback requests generated successfully.');
  } catch (error) {
    console.error('Error generating feedback requests:', error);
  }
});

console.log('Scheduler initialized.');
