'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.addColumn("tasks", "urgency", {
      type: Sequelize.ENUM("atrasada", "pendente", "concluida"),
      defaultValue: "pendente",
      allowNull: false,
    });
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.removeColumn("tasks", "urgency");
  }
};
