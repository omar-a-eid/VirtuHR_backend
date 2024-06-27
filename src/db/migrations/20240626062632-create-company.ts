import { DataTypes, QueryInterface } from 'sequelize';

export default {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.createTable('companies', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      domain_name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      company_size: {
        type: DataTypes.ENUM(
          '1-24',
          '25-75',
          '76-150',
          '151-300',
          '301-500',
          '501+',
        ),
        validate: {
          isIn: {
            args: [['1-24', '25-75', '76-150', '151-300', '301-500', '501+']],
            msg: 'Employee count should be in the specified range',
          },
        },
        allowNull: false,
      },
      created_at: DataTypes.DATE,
      updated_at: DataTypes.DATE,
    });
  },
  down: async (queryInterface: QueryInterface) => {
    await queryInterface.dropTable('companies');
  },
};
