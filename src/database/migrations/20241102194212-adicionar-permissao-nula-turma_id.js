'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn('notas', 'anos_series_id', {
      type: Sequelize.INTEGER,
      allowNull: true, // Permitir valores nulos
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn('notas', 'anos_series_id', {
      type: Sequelize.INTEGER,
      allowNull: false, // Não permitir valores nulos
    });
  }
};