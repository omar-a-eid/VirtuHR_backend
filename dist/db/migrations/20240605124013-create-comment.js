"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
exports.default = {
    up: async (queryInterface) => {
        await queryInterface.createTable('comments', {
            id: {
                type: sequelize_1.DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            goal_id: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'goals',
                    key: 'id',
                },
            },
            employee_id: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'employees',
                    key: 'id',
                },
            },
            comment_text: {
                type: sequelize_1.DataTypes.TEXT,
                allowNull: false,
            },
            created_at: sequelize_1.DataTypes.DATE,
            updated_at: sequelize_1.DataTypes.DATE,
        });
    },
    down: async (queryInterface) => {
        // Define how to revert the changes made in the `up` method
        await queryInterface.dropTable('comments');
    },
};
