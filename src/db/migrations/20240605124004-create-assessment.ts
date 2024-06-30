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
      manager_questions: {
        type: DataTypes.JSON,
        allowNull: false,
      },
      self_questions: {
        type: DataTypes.JSON,
        allowNull: false,
      },
      start_date: {
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
    await queryInterface.dropTable('assessments');
  },
};
