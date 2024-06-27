"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jobposting_1 = __importDefault(require("../db/models/jobposting"));
class JobPostingRepository {
    async getAll() {
        return jobposting_1.default.findAll();
    }
    async getById(id) {
        return jobposting_1.default.findByPk(id);
    }
    async add(jobPostingData) {
        return jobposting_1.default.create(jobPostingData);
    }
    async update(id, jobPosting) {
        await jobposting_1.default.update(jobPosting, { where: { id } });
    }
    async delete(id, softDelete = true) {
        if (softDelete) {
            return await jobposting_1.default.destroy({ where: { id } }); // Soft delete
        }
        else {
            return await jobposting_1.default.destroy({ where: { id }, force: true }); // Hard delete
        }
    }
}
exports.default = new JobPostingRepository();
