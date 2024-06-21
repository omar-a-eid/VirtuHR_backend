"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
exports.default = {
    up: async (queryInterface) => {
        await queryInterface.createTable('feedbacks', {
            id: {
                type: sequelize_1.DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            cycle_id: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'cycles',
                    key: 'id',
                },
            },
            feedback_type: {
                type: sequelize_1.DataTypes.ENUM('upward', 'peer'),
                allowNull: false,
                validate: {
                    isIn: [['upward', 'peer']],
                },
            },
            questions: {
                type: sequelize_1.DataTypes.JSON,
                defaultValue: [],
            },
            created_at: sequelize_1.DataTypes.DATE,
            updated_at: sequelize_1.DataTypes.DATE,
        });
    },
    down: async (queryInterface) => {
        // Define how to revert the changes made in the `up` method
        await queryInterface.dropTable('feedbacks');
    },
};
