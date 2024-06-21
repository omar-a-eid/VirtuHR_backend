"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../../config/database"));
class Applicant extends sequelize_1.Model {
    static associate(models) {
        this.belongsTo(models.JobPosting, {
            foreignKey: 'job_id',
            onDelete: 'CASCADE',
        });
        this.hasOne(models.Interview);
    }
}
Applicant.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    fullName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
        },
    },
    phone: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    cvPath: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    applicantStatus: {
        type: sequelize_1.DataTypes.ENUM('applied', 'interviewing', 'hired', 'rejected'),
        allowNull: false,
    },
    jobId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'job_postings',
            key: 'id',
        },
    },
    coverLetter: {
        type: sequelize_1.DataTypes.TEXT,
    },
    university: {
        type: sequelize_1.DataTypes.STRING,
    },
    college: {
        type: sequelize_1.DataTypes.STRING,
    },
    major: {
        type: sequelize_1.DataTypes.STRING,
    },
    graduationDate: {
        type: sequelize_1.DataTypes.DATE,
    },
    createdAt: sequelize_1.DataTypes.DATE,
    updatedAt: sequelize_1.DataTypes.DATE,
}, {
    sequelize: database_1.default,
    modelName: 'Applicant',
    timestamps: true,
    underscored: true,
});
exports.default = Applicant;
