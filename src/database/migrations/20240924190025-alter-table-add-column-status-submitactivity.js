'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.addColumn('submit_activity', 'status', {
      type: Sequelize.ENUM('ATRIBUIDO', 'ENTREGUE', 'PENDENTE'),
      defaultValue: 'ATRIBUIDO',
      allowNull: false,
    });
  },

  async down (queryInterface) {
    return queryInterface.removeColumn("submit_activity", "status");
  }
};
