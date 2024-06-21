"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
exports.default = {
    up: async (queryInterface) => {
        await queryInterface.createTable('job_postings', {
            id: {
                type: sequelize_1.DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            title: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false,
            },
            job_status: {
                type: sequelize_1.DataTypes.ENUM('archived', 'active'),
            },
            hiring_lead_id: {
                type: sequelize_1.DataTypes.INTEGER,
                references: {
                    model: 'employees',
                    key: 'id',
                },
            },
            department_id: {
                type: sequelize_1.DataTypes.INTEGER,
                references: {
                    model: 'departments',
                    key: 'id',
                },
            },
            employment_type: {
                type: sequelize_1.DataTypes.ENUM('full time', 'part time', 'freelance', 'internship'),
            },
            minimum_experience: {
                type: sequelize_1.DataTypes.INTEGER,
            },
            compensation: {
                type: sequelize_1.DataTypes.INTEGER,
            },
            description: {
                type: sequelize_1.DataTypes.JSON,
            },
            location: {
                type: sequelize_1.DataTypes.STRING,
            },
            created_at: sequelize_1.DataTypes.DATE,
            updated_at: sequelize_1.DataTypes.DATE,
        });
    },
    down: async (queryInterface) => {
        // Define how to revert the changes made in the `up` method
        await queryInterface.dropTable('job_postings');
    },
};
