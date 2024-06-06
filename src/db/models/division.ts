import { DataTypes, Model } from 'sequelize';
import sequelize from '../../config/database';

class Division extends Model {
  declare id: number;
  declare name: string;
  declare createdAt: Date;
  declare updatedAt: Date;

  static associate(models: any) {
    this.hasMany(models.Department);
  }
}

Division.init(
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
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  {
    sequelize,
    modelName: 'Division',
    timestamps: true,
    underscored: true,
  },
);

export default Division;
