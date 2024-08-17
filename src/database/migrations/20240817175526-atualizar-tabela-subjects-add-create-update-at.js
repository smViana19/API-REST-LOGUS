'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('subjects', 'created_at', {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'), // Define o valor padrão
    });

    await queryInterface.addColumn('subjects', 'updated_at', {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'), // Define o valor padrão
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('subjects', 'created_at');
    await queryInterface.removeColumn('subjects', 'updated_at');
  }
};