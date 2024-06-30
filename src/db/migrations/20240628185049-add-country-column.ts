import { DataTypes, QueryInterface } from 'sequelize';
export default {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.addColumn('companies', 'country', {
      type: DataTypes.STRING,
      allowNull: true,
    });
  },
  down: async (queryInterface: QueryInterface) => {
    await queryInterface.removeColumn('companies', 'country');
  },
};
