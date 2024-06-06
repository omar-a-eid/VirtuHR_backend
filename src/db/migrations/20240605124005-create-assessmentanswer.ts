import { DataTypes, QueryInterface } from 'sequelize';

export default {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.createTable('assessment_answers', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      assessment_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'assessments',
          key: 'id',
        },
        allowNull: false,
        onDelete: 'CASCADE',
      },
      answer_text: {
        type: DataTypes.JSON,
        allowNull: false,
      },
      created_at: DataTypes.DATE,
      updated_at: DataTypes.DATE,
    });
  },
  down: async (queryInterface: QueryInterface) => {
    // Define how to revert the changes made in the `up` method
    await queryInterface.dropTable('assessment_answers');
  },
};
