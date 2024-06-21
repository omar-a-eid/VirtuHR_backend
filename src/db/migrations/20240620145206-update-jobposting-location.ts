import { QueryInterface, DataTypes } from 'sequelize';

module.exports = {
  up: async (queryInterface: QueryInterface, Sequelize: any) => {
    await queryInterface.changeColumn('job_postings', 'location', {
      type: DataTypes.STRING,
      allowNull: true,
    });
  },

  down: async (queryInterface: QueryInterface, Sequelize: any) => {
    await queryInterface.changeColumn('job_postings', 'location', {
      type: DataTypes.STRING,
      allowNull: false,
    });
  },
};
