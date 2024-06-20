// migrations/20240605124005-add-departmentId-to-employees.js
import { DataTypes, QueryInterface } from 'sequelize';
export default {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.addColumn('departments', 'manager_id', {
      type: DataTypes.INTEGER,
      references: {
        model: 'employees',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    });
  },
  down: async (queryInterface: QueryInterface) => {
    await queryInterface.removeColumn('departments', 'manager_id');
  },
};
