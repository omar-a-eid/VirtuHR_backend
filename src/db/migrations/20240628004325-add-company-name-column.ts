import { DataTypes, QueryInterface } from 'sequelize';
export default {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.addColumn('companies', 'company_name', {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '',
    });
  },
  down: async (queryInterface: QueryInterface) => {
    await queryInterface.removeColumn('companies', 'company_name');
  },
};
