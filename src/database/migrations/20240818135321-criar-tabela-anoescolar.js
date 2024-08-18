'use strict';
const Sequelize = require("sequelize");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('anos_escolares', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      ano: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      data_inicio: {
        type: Sequelize.DATE,
        allowNull: true
      },
      data_fim: {
        type: Sequelize.DATE,
        allowNull: true
      },
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('anos_escolares')
  }
};
