"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
exports.default = {
    up: async (queryInterface) => {
        await queryInterface.createTable('attendances', {
            id: {
                type: sequelize_1.DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            employee_id: {
                type: sequelize_1.DataTypes.INTEGER,
                references: {
                    model: 'employees',
                    key: 'id',
                },
                allowNull: false,
                onDelete: 'CASCADE',
            },
            hours: {
                type: sequelize_1.DataTypes.INTEGER,
            },
            checked_out: {
                type: sequelize_1.DataTypes.BOOLEAN,
                allowNull: false,
            },
            created_at: sequelize_1.DataTypes.DATE,
            updated_at: sequelize_1.DataTypes.DATE,
        });
    },
    down: async (queryInterface) => {
        // Define how to revert the changes made in the `up` method
        await queryInterface.dropTable('attendances');
    },
};
