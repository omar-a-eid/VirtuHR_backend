"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
exports.default = {
    up: async (queryInterface) => {
        await queryInterface.createTable('goals', {
            id: {
                type: sequelize_1.DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            title: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false,
            },
            assigned_to: {
                type: sequelize_1.DataTypes.INTEGER,
                references: {
                    model: 'employees',
                    key: 'id',
                },
                onDelete: 'SET NULL',
            },
            due_date: {
                type: sequelize_1.DataTypes.DATE,
            },
            created_at: sequelize_1.DataTypes.DATE,
            updated_at: sequelize_1.DataTypes.DATE,
            note: {
                type: sequelize_1.DataTypes.TEXT,
            },
            progress: {
                type: sequelize_1.DataTypes.INTEGER,
                validate: {
                    min: 0,
                    max: 100,
                },
            },
        });
    },
    down: async (queryInterface) => {
        // Define how to revert the changes made in the `up` method
        await queryInterface.dropTable('goals');
    },
};
