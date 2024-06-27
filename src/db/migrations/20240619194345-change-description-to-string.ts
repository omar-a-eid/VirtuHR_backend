import { QueryInterface, DataTypes } from 'sequelize';

module.exports = {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.changeColumn('job_postings', 'description', {
      type: DataTypes.STRING,
    });
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.changeColumn('job_postings', 'description', {
      type: DataTypes.JSON,
    });
  },
};
