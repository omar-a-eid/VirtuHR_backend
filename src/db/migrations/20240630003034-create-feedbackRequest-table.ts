import { DataTypes, QueryInterface } from 'sequelize';

export default {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.createTable('feedback_requests', {
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
      from_employee_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'employees',
          key: 'id',
        },
        allowNull: false,
        onDelete: 'CASCADE',
      },
      to_employee_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'employees',
          key: 'id',
        },
        allowNull: false,
        onDelete: 'CASCADE',
      },
      status: {
        type: DataTypes.ENUM('pending', 'completed'),
        defaultValue: 'pending',
      },
      created_at: DataTypes.DATE,
      updated_at: DataTypes.DATE,
    });
  },
  down: async (queryInterface: QueryInterface) => {
    await queryInterface.dropTable('feedback_requests');
  },
};
