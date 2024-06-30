import { DataTypes, QueryInterface } from 'sequelize';

export default {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.createTable('cycles', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      start_date: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      cycle_type: {
        type: DataTypes.ENUM('fixed', 'schedule'),
        allowNull: false,
        validate: {
          isIn: [['fixed', 'schedule']],
        },
      },
      company_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'companies',
          key: 'id',
        },
        onDelete: 'CASCADE',
        allowNull: false,
      },
      include_all: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull: false,
      },
      active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
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
    await queryInterface.dropTable('cycles');
  },
};
