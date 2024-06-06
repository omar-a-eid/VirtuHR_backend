import { DataTypes, QueryInterface } from 'sequelize';

export default {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.createTable('feedbacks', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      cycle_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'cycles',
          key: 'id',
        },
      },
      feedback_type: {
        type: DataTypes.ENUM('upward', 'peer'),
        allowNull: false,
        validate: {
          isIn: [['upward', 'peer']],
        },
      },
      questions: {
        type: DataTypes.JSON,
        defaultValue: [],
      },
      created_at: DataTypes.DATE,
      updated_at: DataTypes.DATE,
    });
  },
  down: async (queryInterface: QueryInterface) => {
    // Define how to revert the changes made in the `up` method
    await queryInterface.dropTable('feedbacks');
  },
};
