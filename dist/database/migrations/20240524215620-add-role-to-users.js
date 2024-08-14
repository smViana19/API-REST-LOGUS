"use strict";"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.addColumn("users", "role", {
      type: Sequelize.ENUM("diretor", "estudante", "professor"),
      defaultValue: "estudante",
      allowNull: false,
    });
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.removeColumn("users", "role");
  },
};
