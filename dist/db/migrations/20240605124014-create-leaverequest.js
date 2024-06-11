"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
exports.default = {
    up: async (queryInterface) => {
        await queryInterface.createTable('leave_requests', {
            id: {
                type: sequelize_1.DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            employee_id: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'employees',
                    key: 'id',
                },
                onDelete: 'CASCADE',
            },
            start_time: {
                type: sequelize_1.DataTypes.TIME,
                allowNull: false,
            },
            end_time: {
                type: sequelize_1.DataTypes.TIME,
                allowNull: false,
            },
            status: {
                type: sequelize_1.DataTypes.ENUM('rejected', 'accepted', 'pending'),
                allowNull: false,
                validate: {
                    isIn: [['rejected', 'accepted', 'pending']],
                },
            },
            comment: {
                type: sequelize_1.DataTypes.TEXT,
            },
            category: {
                type: sequelize_1.DataTypes.ENUM('sick', 'maternity', 'holiday', 'personal'),
                allowNull: false,
                validate: {
                    isIn: [['sick', 'maternity', 'holiday', 'personal']],
                },
            },
            note: {
                type: sequelize_1.DataTypes.TEXT,
            },
            created_at: sequelize_1.DataTypes.DATE,
            updated_at: sequelize_1.DataTypes.DATE,
        });
    },
    down: async (queryInterface) => {
        // Define how to revert the changes made in the `up` method
        await queryInterface.dropTable('leave_requests');
    },
};
