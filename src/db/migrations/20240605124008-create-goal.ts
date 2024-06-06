import { DataTypes, QueryInterface } from 'sequelize';

export default {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.createTable('goals', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      assigned_to: {
        type: DataTypes.INTEGER,
        references: {
          model: 'employees',
          key: 'id',
        },
        onDelete: 'SET NULL',
      },
      due_date: {
        type: DataTypes.DATE,
      },
      created_at: DataTypes.DATE,
      updated_at: DataTypes.DATE,
      note: {
        type: DataTypes.TEXT,
      },
      progress: {
        type: DataTypes.INTEGER,
        validate: {
          min: 0,
          max: 100,
        },
      },
    });
  },
  down: async (queryInterface: QueryInterface) => {
    // Define how to revert the changes made in the `up` method
    await queryInterface.dropTable('goals');
  },
};
