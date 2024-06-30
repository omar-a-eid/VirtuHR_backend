import { DataTypes, Model } from 'sequelize';
import sequelize from '../../config/database';

class Cycle extends Model {
  declare id: number;
  declare name: string;
  declare startDate?: Date;
  declare cycleType: 'fixed' | 'schedule';
  declare companyId: number;
  declare includeAll: boolean;
  declare active: boolean;
  declare createdAt: Date;
  declare updatedAt: Date;

  static associate(models: any) {
    this.belongsTo(models.Company, {
      foreignKey: 'companyId',
      as: 'cycles',
      onDelete: 'CASCADE',
    });

    // this.belongsToMany(models.Employee, { through: 'employees_cycles' });
    this.hasMany(models.Feedback, {
      foreignKey: 'cycleId',
      onDelete: 'CASCADE',
    });
    this.hasOne(models.Assessment, {
      foreignKey: 'cycleId',
      onDelete: 'CASCADE',
    });
  }
}

Cycle.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    startDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    cycleType: {
      type: DataTypes.ENUM('fixed', 'schedule'),
      validate: {
        isIn: [['fixed', 'schedule']],
      },
    },
    companyId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'companies',
        key: 'id',
      },
      onDelete: 'CASCADE',
      allowNull: false,
    },
    includeAll: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: false,
    },
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: false,
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  {
    sequelize,
    modelName: 'Cycle',
    timestamps: true,
    underscored: true,
  },
);

export default Cycle;
