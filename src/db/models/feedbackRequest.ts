import { DataTypes, Model } from 'sequelize';
import sequelize from '../../config/database';

class FeedbackRequest extends Model {
  declare id: number;
  declare cycleId: number;
  declare fromEmployeeId: number;
  declare toEmployeeId: number;
  declare status: 'pending' | 'completed';
  declare createdAt: Date;
  declare updatedAt: Date;

  static associate(models: any) {
    this.belongsTo(models.Cycle, {
      foreignKey: 'cycleId',
      onDelete: 'CASCADE',
    });
    this.belongsTo(models.Employee, {
      foreignKey: 'fromEmployeeId',
      as: 'fromEmployee',
      onDelete: 'CASCADE',
    });
    this.belongsTo(models.Employee, {
      foreignKey: 'toEmployeeId',
      as: 'toEmployee',
      onDelete: 'CASCADE',
    });
  }
}

FeedbackRequest.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    cycleId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'cycles',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    fromEmployeeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'employees',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    toEmployeeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'employees',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    status: {
      type: DataTypes.ENUM('pending', 'completed'),
      defaultValue: 'pending',
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  {
    sequelize,
    modelName: 'FeedbackRequest',
    timestamps: true,
    underscored: true,
  },
);

export default FeedbackRequest;
