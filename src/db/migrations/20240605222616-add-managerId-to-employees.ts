// migrations/20240605124005-add-departmentId-to-employees.js
import { DataTypes, QueryInterface } from 'sequelize';
export default {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.addColumn('departments', 'managerId', {
      type: DataTypes.INTEGER,
      references: {
        model: 'employees',
        key: 'id',
      },
    });
  },
  down: async (queryInterface: QueryInterface) => {
    await queryInterface.removeColumn('departments', 'managerId');
  },
};
