import { DataTypes, QueryInterface } from 'sequelize';

export default {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.createTable('applicants', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      full_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      cv_path: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      applicant_status: {
        type: DataTypes.ENUM('applied', 'interviewing', 'hired', 'rejected'),
        allowNull: false,
      },
      job_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'job_postings',
          key: 'id',
        },
      },
      cover_letter: {
        type: DataTypes.TEXT,
      },
      university: {
        type: DataTypes.STRING,
      },
      college: {
        type: DataTypes.STRING,
      },
      major: {
        type: DataTypes.STRING,
      },
      graduation_date: {
        type: DataTypes.DATE,
      },
      created_at: DataTypes.DATE,
      updated_at: DataTypes.DATE,
    });
  },
  down: async (queryInterface: QueryInterface) => {
    // Define how to revert the changes made in the `up` method
    await queryInterface.dropTable('applicants');
  },
};
