import { QueryInterface, DataTypes } from 'sequelize';

module.exports = {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.changeColumn('job_postings', 'minimum_experience', {
      type: DataTypes.STRING,
      allowNull: true, // Adjust according to your requirements
    });
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.changeColumn('job_postings', 'minimum_experience', {
      type: DataTypes.INTEGER,
      allowNull: true, // Adjust according to your previous requirements
    });
  },
};
