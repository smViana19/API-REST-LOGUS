'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.removeColumn('notas', 'trimester');
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.addColumn('notas', 'trimester', {
      type: Sequelize.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
        max: 3
      },
    });
  }
};
