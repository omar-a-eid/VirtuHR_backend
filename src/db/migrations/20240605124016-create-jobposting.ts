import { DataTypes, QueryInterface } from 'sequelize';

export default {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.createTable('job_postings', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      job_status: {
        type: DataTypes.ENUM('archived', 'active'),
      },
      hiring_lead_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'employees',
          key: 'id',
        },
      },
      department_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'departments',
          key: 'id',
        },
      },
      employment_type: {
        type: DataTypes.ENUM(
          'full time',
          'part time',
          'freelance',
          'internship',
        ),
      },
      minimum_experience: {
        type: DataTypes.INTEGER,
      },
      compensation: {
        type: DataTypes.INTEGER,
      },
      description: {
        type: DataTypes.JSON,
      },
      location: {
        type: DataTypes.STRING,
      },
      created_at: DataTypes.DATE,
      updated_at: DataTypes.DATE,
    });
  },
  down: async (queryInterface: QueryInterface) => {
    // Define how to revert the changes made in the `up` method
    await queryInterface.dropTable('job_postings');
  },
};
