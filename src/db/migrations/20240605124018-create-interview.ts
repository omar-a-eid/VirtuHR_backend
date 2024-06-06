import { DataTypes, QueryInterface } from 'sequelize';

export default {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.createTable('interviews', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      applicant_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'applicants',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      interview_type: {
        type: DataTypes.ENUM('on-site', 'online'),
        allowNull: false,
        validate: {
          isIn: [['on-site', 'online']],
        },
      },
      scheduled_at: {
        type: DataTypes.DATE,
      },
      interview_status: {
        type: DataTypes.ENUM(
          'scheduled',
          'pending',
          'in progress',
          'completed',
          'cancelled',
          'rescheduled',
          'no show',
        ),
        allowNull: false,
        validate: {
          isIn: [
            [
              'scheduled',
              'pending',
              'in progress',
              'completed',
              'cancelled',
              'rescheduled',
              'no show',
            ],
          ],
        },
      },
      created_at: DataTypes.DATE,
      updated_at: DataTypes.DATE,
      location_or_link: {
        type: DataTypes.STRING,
      },
    });
  },
  down: async (queryInterface: QueryInterface) => {
    // Define how to revert the changes made in the `up` method
    await queryInterface.dropTable('interviews');
  },
};
