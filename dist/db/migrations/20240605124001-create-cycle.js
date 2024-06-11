"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
exports.default = {
    up: async (queryInterface) => {
        await queryInterface.createTable('cycles', {
            id: {
                type: sequelize_1.DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            name: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false,
            },
            start_date: {
                type: sequelize_1.DataTypes.DATE,
            },
            period: {
                type: sequelize_1.DataTypes.STRING,
            },
            cycle_type: {
                type: sequelize_1.DataTypes.ENUM('interval', 'start_date'),
                validate: {
                    isIn: [['interval', 'start_date']],
                },
            },
            include_all: {
                type: sequelize_1.DataTypes.BOOLEAN,
                defaultValue: true,
                allowNull: false,
            },
            created_at: sequelize_1.DataTypes.DATE,
            updated_at: sequelize_1.DataTypes.DATE,
        });
    },
    down: async (queryInterface) => {
        // Define how to revert the changes made in the `up` method
        await queryInterface.dropTable('cycles');
    },
};
