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
        onDelete: 'CASCADE',
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
        allowNull: true,
      },
      reminder: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      repeat: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    });
  },
  down: async (queryInterface: QueryInterface) => {
    await queryInterface.dropTable('feedbacks');
  },
};
