"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../../config/database"));
class JobPosting extends sequelize_1.Model {
    static associate(models) {
        this.belongsTo(models.Employee, {
            foreignKey: 'hiringLeadId',
            onDelete: 'SET NULL',
        });
        this.belongsTo(models.Department, {
            foreignKey: 'departmentId',
            onDelete: 'SET NULL',
        });
        this.hasMany(models.Applicant, {
            foreignKey: 'jobId',
            onDelete: 'CASCADE',
        });
    }
}
JobPosting.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    title: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    jobStatus: {
        type: sequelize_1.DataTypes.ENUM('archived', 'active'),
    },
    hiringLeadId: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: 'employees',
            key: 'id',
        },
    },
    departmentId: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: 'departments',
            key: 'id',
        },
    },
    employmentType: {
        type: sequelize_1.DataTypes.ENUM('full time', 'part time', 'freelance', 'internship'),
    },
    minimumExperience: {
        type: sequelize_1.DataTypes.STRING,
    },
    compensation: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    description: {
        type: sequelize_1.DataTypes.STRING,
    },
    location: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    createdAt: sequelize_1.DataTypes.DATE,
    updatedAt: sequelize_1.DataTypes.DATE,
}, {
    sequelize: database_1.default,
    modelName: 'JobPosting',
    timestamps: true,
    underscored: true,
});
exports.default = JobPosting;
