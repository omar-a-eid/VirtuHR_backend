import { DataTypes, QueryInterface } from 'sequelize';

module.exports = {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.renameColumn('goals', 'progress', 'is_completed');
    await queryInterface.changeColumn('goals', 'is_completed', {
      type: DataTypes.BOOLEAN,
    });
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.changeColumn('goals', 'is_completed', {
      type: DataTypes.NUMBER,
    });
    await queryInterface.renameColumn('goals', 'is_completed', 'progress');
  },
};
