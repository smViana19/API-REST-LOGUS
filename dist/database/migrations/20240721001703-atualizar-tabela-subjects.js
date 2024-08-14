"use strict";'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('subjects', 'user_id', {
      type: Sequelize.INTEGER,
      references: {
        model: 'users', // Nome da tabela referenciada
        key: 'id', // Chave primária da tabela referenciada
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
      allowNull: false,
      defaultValue: 1, // Certifique-se de que o ID 1 existe na tabela users ou ajuste conforme necessário
    });
    await queryInterface.changeColumn('subjects', 'user_id', {
      type: Sequelize.INTEGER,
      references: {
        model: 'users',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
      allowNull: false,
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('subjects', 'user_id');
  }
};
