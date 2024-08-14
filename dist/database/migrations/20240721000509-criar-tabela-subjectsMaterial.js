"use strict";'use strict';

const Sequelize = require("sequelize");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable('subjects_material', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users',  // Nome da tabela de usuários
          key: 'id',       // Nome da coluna na tabela de usuários
        },
      },
      subject_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'subjects',  // Nome da tabela de subjects
          key: 'id',       // Nome da coluna na tabela de subjects
        },
      },
      nome: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      pontos: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      categoria: {
        type: Sequelize.ENUM("ATIVIDADE", "RESUMOS", "APRESENTACAO", "OUTROS"),
        defaultValue: "ATIVIDADE",
      },
      detalhes: {
        type: Sequelize.STRING,
        defaultValue: ""
      },
      data_entrega: {
        type: Sequelize.DATE,
        allowNull: true,
      }
    })
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */

    await queryInterface.dropTable('subjects_material');
  }
};
