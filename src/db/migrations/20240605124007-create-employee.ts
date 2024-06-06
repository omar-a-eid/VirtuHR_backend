import { DataTypes, QueryInterface } from 'sequelize';

export default {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.createTable('employees', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      first_name: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      last_name: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true,
      },
      image: {
        type: DataTypes.STRING(255),
      },
      passowrd: {
        type: DataTypes.STRING,
      },
      phone: {
        type: DataTypes.STRING(50),
      },
      position: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      department_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'departments',
          key: 'id',
        },
        onDelete: 'SET NULL',
      },
      salary: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: 0,
        },
      },
      created_at: DataTypes.DATE,
      updated_at: DataTypes.DATE,
      deleted_at: DataTypes.DATE,
      gender: {
        type: DataTypes.ENUM('M', 'F'),
        allowNull: false,
        validate: {
          isIn: [['M', 'F']],
        },
      },
      hire_date: {
        type: DataTypes.DATE,
      },
      manager_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'employees',
          key: 'id',
        },
        onDelete: 'SET NULL',
      },
      location: {
        type: DataTypes.STRING(255),
      },
      days_off_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'days_off',
          key: 'id',
        },
        onDelete: 'SET NULL',
      },
      employment_type: {
        type: DataTypes.STRING(20),
        allowNull: false,
        defaultValue: 'full time',
        validate: {
          isIn: [['full time', 'part time', 'freelance', 'internship']],
        },
      },
    });
  },
  down: async (queryInterface: QueryInterface) => {
    // Define how to revert the changes made in the `up` method
    await queryInterface.dropTable('employees');
  },
};
