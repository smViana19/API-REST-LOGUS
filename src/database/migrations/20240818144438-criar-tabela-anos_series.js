'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('anos_series', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      ano_escolar_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'anos_escolares',
          key: 'id',
        },
      },
      serie_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'series',
          key: 'id',
        },
      },
      turma: {
        type: Sequelize.STRING,
        allowNull: false
      }
    })
  },

  async down (queryInterface) {
    await queryInterface.dropTable('anos_series')
  }
};
