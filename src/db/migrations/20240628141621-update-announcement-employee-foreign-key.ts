'use strict';
import { QueryInterface } from 'sequelize';
module.exports = {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.renameColumn(
      'announcements',
      'employeeId',
      'employee_id',
    );
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.renameColumn(
      'announcements',
      'employee_id',
      'employeeId',
    );
  },
};
