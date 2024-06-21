"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// migrations/20240605124005-add-departmentId-to-employees.js
const sequelize_1 = require("sequelize");
exports.default = {
    up: async (queryInterface) => {
        await queryInterface.addColumn('departments', 'managerId', {
            type: sequelize_1.DataTypes.INTEGER,
            references: {
                model: 'employees',
                key: 'id',
            },
        });
    },
    down: async (queryInterface) => {
        await queryInterface.removeColumn('departments', 'managerId');
    },
};
