import { DataTypes, QueryInterface } from 'sequelize';

export default {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.createTable('assessments', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      cycle_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'cycles',
          key: 'id',
        },
        allowNull: false,
        onDelete: 'CASCADE',
      },
      questions: {
        type: DataTypes.JSON,
        allowNull: false,
      },
      question_type: {
        type: DataTypes.ENUM('self', 'manager'),
        allowNull: false,
        validate: {
          isIn: [['self', 'manager']],
        },
      },
      created_at: DataTypes.DATE,
      updated_at: DataTypes.DATE,
    });
  },
  down: async (queryInterface: QueryInterface) => {
    // Define how to revert the changes made in the `up` method
    await queryInterface.dropTable('assessments');
  },
};
