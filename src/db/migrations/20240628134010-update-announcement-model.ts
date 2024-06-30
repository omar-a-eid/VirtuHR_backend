'use strict';
import { QueryInterface } from 'sequelize';
module.exports = {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.renameColumn(
      'announcements',
      'employ_id',
      'employeeId',
    );
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.renameColumn(
      'announcements',
      'employeeId',
      'employ_id',
    );
  },
};
