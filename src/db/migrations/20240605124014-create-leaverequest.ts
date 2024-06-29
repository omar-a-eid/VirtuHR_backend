import { DataTypes, QueryInterface } from 'sequelize';

export default {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.createTable('leave_requests', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      employee_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'employees',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      start_time: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      end_time: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM('rejected', 'accepted', 'pending'),
        allowNull: false,
        defaultValue: 'pending',
        validate: {
          isIn: [['rejected', 'accepted', 'pending']],
        },
      },
      comment: {
        type: DataTypes.TEXT,
      },
      category: {
        type: DataTypes.ENUM('sick', 'maternity', 'holiday', 'personal'),
        allowNull: false,
        validate: {
          isIn: [['sick', 'maternity', 'holiday', 'personal']],
        },
      },
      note: {
        type: DataTypes.TEXT,
      },
      created_at: DataTypes.DATE,
      updated_at: DataTypes.DATE,
    });
  },
  down: async (queryInterface: QueryInterface) => {
    // Define how to revert the changes made in the `up` method
    await queryInterface.dropTable('leave_requests');
  },
};
