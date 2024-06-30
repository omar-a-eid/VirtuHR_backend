"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// migrations/20240605124005-add-departmentId-to-employees.js
const sequelize_1 = require("sequelize");
exports.default = {
    up: async (queryInterface) => {
        await queryInterface.addColumn('departments', 'manager_id', {
            type: sequelize_1.DataTypes.INTEGER,
            references: {
                model: 'employees',
                key: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL',
        });
    },
    down: async (queryInterface) => {
        await queryInterface.removeColumn('departments', 'manager_id');
    },
};
