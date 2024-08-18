'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('series', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      nivel_educacional_id : {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'niveis_escolares',
          key: 'id',
        },
      },
      nome: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      descricao: {
        type: Sequelize.STRING,
        allowNull: true
      }
    })
  },

  async down (queryInterface) {
    await queryInterface.dropTable('series')
  }
};
