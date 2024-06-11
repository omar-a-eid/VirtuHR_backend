"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
exports.default = {
    up: async (queryInterface) => {
        await queryInterface.createTable('terminations', {
            id: {
                type: sequelize_1.DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            reason: {
                type: sequelize_1.DataTypes.TEXT,
            },
            employee_id: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: true,
                references: {
                    model: 'employees',
                    key: 'id',
                },
                onDelete: 'CASCADE',
            },
            created_at: sequelize_1.DataTypes.DATE,
            updated_at: sequelize_1.DataTypes.DATE,
        });
    },
    down: async (queryInterface) => {
        // Define how to revert the changes made in the `up` method
        await queryInterface.dropTable('terminations');
    },
};
