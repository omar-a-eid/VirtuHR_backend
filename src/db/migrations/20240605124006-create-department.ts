import { DataTypes, QueryInterface } from 'sequelize';

export default {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.createTable('departments', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      division_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'divisions',
          key: 'id',
        },
      },
      created_at: DataTypes.DATE,
      updated_at: DataTypes.DATE,
    });
  },
  down: async (queryInterface: QueryInterface) => {
    // Define how to revert the changes made in the `up` method
    await queryInterface.dropTable('departments');
  },
};
