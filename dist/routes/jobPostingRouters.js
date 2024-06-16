"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const jobPostingController_1 = require("../controllers/jobPostingController");
const router = express_1.default.Router();
router.get('/jobPosting', jobPostingController_1.getAllJobPostings);
router.get('/jobPosting/:id', jobPostingController_1.getJobPostingById);
router.post('/jobPosting', jobPostingController_1.createJobPosting);
router.put('/jobPosting/:id', jobPostingController_1.updateJobPosting);
router.delete('/jobPosting/:id', jobPostingController_1.deleteJobPosting);
exports.default = router;
