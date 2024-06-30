import { DataTypes, Model } from 'sequelize';
import sequelize from '../../config/database';

class Report extends Model {
  declare id: number;
  declare reportName: string;
  declare selectedFields: { label: string; value: string }[];
  declare createdAt: Date;
  declare updatedAt: Date;
}

Report.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    reportName: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Report name is required',
        },
        len: {
          args: [4, 255],
          msg: 'Report name must be between 4 and 255 characters',
        },
      },
    },
    selectedFields: {
      type: DataTypes.JSON,
      allowNull: false,
      validate: {
        isArrayOfObjectsWithLabelValue(value: any) {
          if (!Array.isArray(value)) {
            throw new Error('Selected fields must be an array');
          }
          value.forEach((field: any) => {
            if (typeof field !== 'object' || field === null) {
              throw new Error('Each selected field must be an object');
            }
            if (
              typeof field.label !== 'string' ||
              typeof field.value !== 'string'
            ) {
              throw new Error(
                'Each selected field object must have a label and value of type string',
              );
            }
          });
        },
      },
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  {
    sequelize,
    modelName: 'Report',
    timestamps: true,
    underscored: true,
  },
);

export default Report;
