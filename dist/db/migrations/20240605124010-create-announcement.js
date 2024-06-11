"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
exports.default = {
    up: async (queryInterface) => {
        await queryInterface.createTable('announcements', {
            id: {
                type: sequelize_1.DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            title: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false,
            },
            description: {
                type: sequelize_1.DataTypes.TEXT,
                allowNull: false,
            },
            employ_id: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'employees',
                    key: 'id',
                },
            },
            send_to_all: {
                type: sequelize_1.DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: true,
            },
            created_at: sequelize_1.DataTypes.DATE,
            updated_at: sequelize_1.DataTypes.DATE,
            deleted_at: sequelize_1.DataTypes.DATE,
        });
    },
    down: async (queryInterface) => {
        // Define how to revert the changes made in the `up` method
        await queryInterface.dropTable('announcements');
    },
};
