"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
exports.default = {
    up: async (queryInterface) => {
        await queryInterface.createTable('assessments', {
            id: {
                type: sequelize_1.DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            cycle_id: {
                type: sequelize_1.DataTypes.INTEGER,
                references: {
                    model: 'cycles',
                    key: 'id',
                },
                allowNull: false,
                onDelete: 'CASCADE',
            },
            questions: {
                type: sequelize_1.DataTypes.JSON,
                allowNull: false,
            },
            question_type: {
                type: sequelize_1.DataTypes.ENUM('self', 'manager'),
                allowNull: false,
                validate: {
                    isIn: [['self', 'manager']],
                },
            },
            created_at: sequelize_1.DataTypes.DATE,
            updated_at: sequelize_1.DataTypes.DATE,
        });
    },
    down: async (queryInterface) => {
        // Define how to revert the changes made in the `up` method
        await queryInterface.dropTable('assessments');
    },
};
