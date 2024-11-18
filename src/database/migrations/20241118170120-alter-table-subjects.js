'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("subjects", "class_id", {
      type: Sequelize.INTEGER,
      references: {
        model: "classes",
        key: "id",
      },
      onDelete: 'CASCADE',
      onUpdate: "CASCADE"
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("subjects", "class_id")
  }
};
