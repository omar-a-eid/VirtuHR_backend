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
        allowNull: true,
      },
      password: {
        type: DataTypes.STRING,
      },
      phone: {
        type: DataTypes.STRING(50),
        validate: {
          is: {
            args: /^[\d\-+\s]+$/,
            msg: 'Phone number must be valid',
          },
        },
        allowNull: true,
      },
      position: {
        type: DataTypes.STRING(100),
        allowNull: true,
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
        allowNull: true,
        validate: {
          min: 0,
        },
      },
      created_at: DataTypes.DATE,
      updated_at: DataTypes.DATE,
      deleted_at: DataTypes.DATE,
      gender: {
        type: DataTypes.ENUM('M', 'F'),
        allowNull: true,
        validate: {
          isIn: [['M', 'F']],
        },
      },
      hire_date: {
        type: DataTypes.DATE,
        defaultValue: Date.now(),
      },
      manager_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'employees',
          key: 'id',
        },
        onDelete: 'SET NULL',
        allowNull: true,
      },
      location: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      days_off_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'days_off',
          key: 'id',
        },
        onDelete: 'SET NULL',
        allowNull: true,
      },
      employment_type: {
        type: DataTypes.STRING(20),
        allowNull: false,
        defaultValue: 'full time',
        validate: {
          isIn: [['full time', 'part time', 'freelance', 'internship']],
        },
      },
      company_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'companies',
          key: 'id',
        },
        onDelete: 'SET NULL',
        allowNull: false,
      },
      role: {
        type: DataTypes.ENUM('admin', 'employee'),
        allowNull: false,
        defaultValue: 'employee',
        validate: {
          isIn: {
            args: [['admin', 'employee']],
            msg: 'Employment type must be one of admin or employee',
          },
        },
      },
      date_of_birth: {
        allowNull: true,
        type: DataTypes.DATE,
      },
    });
  },
  down: async (queryInterface: QueryInterface) => {
    // Define how to revert the changes made in the `up` method
    await queryInterface.dropTable('employees');
  },
};
