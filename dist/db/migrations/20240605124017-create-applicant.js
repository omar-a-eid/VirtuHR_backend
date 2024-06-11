"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
exports.default = {
    up: async (queryInterface) => {
        await queryInterface.createTable('applicants', {
            id: {
                type: sequelize_1.DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            full_name: {
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
            cv_path: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false,
            },
            applicant_status: {
                type: sequelize_1.DataTypes.ENUM('applied', 'interviewing', 'hired', 'rejected'),
                allowNull: false,
            },
            job_id: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'job_postings',
                    key: 'id',
                },
            },
            cover_letter: {
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
            graduation_date: {
                type: sequelize_1.DataTypes.DATE,
            },
            created_at: sequelize_1.DataTypes.DATE,
            updated_at: sequelize_1.DataTypes.DATE,
        });
    },
    down: async (queryInterface) => {
        // Define how to revert the changes made in the `up` method
        await queryInterface.dropTable('applicants');
    },
};
