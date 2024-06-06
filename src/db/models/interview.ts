import { DataTypes, Model } from 'sequelize';
import sequelize from '../../config/database';

class Interview extends Model {
  declare id: number;
  declare applicantId: number;
  declare interviewType: 'onsite' | 'online';
  declare scheduledAt: Date;
  declare interviewStatus:
    | 'scheduled'
    | 'pending'
    | 'in progress'
    | 'completed'
    | 'cancelled'
    | 'rescheduled'
    | 'no show';
  declare locationOrLink: string;
  declare createdAt: Date;
  declare updatedAt: Date;

  static associate(models: any) {
    this.belongsTo(models.Applicant, {
      foreignKey: 'applicant_id',
      onDelete: 'CASCADE',
    });
    this.belongsTo(models.Employee, {
      foreignKey: 'hiring_manager_id',
      onDelete: 'SET NULL',
    });
  }
}

Interview.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    applicantId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'applicants',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    interviewType: {
      type: DataTypes.ENUM('on-site', 'online'),
      allowNull: false,
      validate: {
        isIn: [['on-site', 'online']],
      },
    },
    scheduledAt: {
      type: DataTypes.DATE,
    },
    interviewStatus: {
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
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
    locationOrLink: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    modelName: 'Interview',
    timestamps: true,
    underscored: true,
  },
);

export default Interview;
