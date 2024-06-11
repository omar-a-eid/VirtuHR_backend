"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
exports.default = {
    up: async (queryInterface) => {
        await queryInterface.createTable('employees', {
            id: {
                type: sequelize_1.DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            first_name: {
                type: sequelize_1.DataTypes.STRING(100),
                allowNull: false,
            },
            last_name: {
                type: sequelize_1.DataTypes.STRING(100),
                allowNull: false,
            },
            email: {
                type: sequelize_1.DataTypes.STRING(255),
                allowNull: false,
                unique: true,
            },
            image: {
                type: sequelize_1.DataTypes.STRING(255),
            },
            passowrd: {
                type: sequelize_1.DataTypes.STRING,
            },
            phone: {
                type: sequelize_1.DataTypes.STRING(50),
            },
            position: {
                type: sequelize_1.DataTypes.STRING(100),
                allowNull: false,
            },
            department_id: {
                type: sequelize_1.DataTypes.INTEGER,
                references: {
                    model: 'departments',
                    key: 'id',
                },
                onDelete: 'SET NULL',
            },
            salary: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                validate: {
                    min: 0,
                },
            },
            created_at: sequelize_1.DataTypes.DATE,
            updated_at: sequelize_1.DataTypes.DATE,
            deleted_at: sequelize_1.DataTypes.DATE,
            gender: {
                type: sequelize_1.DataTypes.ENUM('M', 'F'),
                allowNull: false,
                validate: {
                    isIn: [['M', 'F']],
                },
            },
            hire_date: {
                type: sequelize_1.DataTypes.DATE,
            },
            manager_id: {
                type: sequelize_1.DataTypes.INTEGER,
                references: {
                    model: 'employees',
                    key: 'id',
                },
                onDelete: 'SET NULL',
            },
            location: {
                type: sequelize_1.DataTypes.STRING(255),
            },
            days_off_id: {
                type: sequelize_1.DataTypes.INTEGER,
                references: {
                    model: 'days_off',
                    key: 'id',
                },
                onDelete: 'SET NULL',
            },
            employment_type: {
                type: sequelize_1.DataTypes.STRING(20),
                allowNull: false,
                defaultValue: 'full time',
                validate: {
                    isIn: [['full time', 'part time', 'freelance', 'internship']],
                },
            },
        });
    },
    down: async (queryInterface) => {
        // Define how to revert the changes made in the `up` method
        await queryInterface.dropTable('employees');
    },
};
