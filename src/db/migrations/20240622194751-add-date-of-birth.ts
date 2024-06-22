// migrations/20240605124005-add-departmentId-to-employees.js
import { DataTypes, QueryInterface } from 'sequelize';
export default {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.addColumn('employees', 'date_of_birth', {
      type: DataTypes.DATE,
    });
  },
  down: async (queryInterface: QueryInterface) => {
    await queryInterface.removeColumn('employees', 'date_of_birth');
  },
};
