"use strict";const bcryptjs = require('bcryptjs');

"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert(
      "users",
      [
        {
          nome: "Marcela",
          email: "marcelinha@gmail.com",
          password_hash: await bcryptjs.hash('123456', 8),
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          nome: "Joana ",
          email: "joana@gmail.com",
          password_hash: await bcryptjs.hash('654321', 8),
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          nome: "Ana Julia",
          email: "anaju@gmail.com",
          password_hash: await bcryptjs.hash('321654', 8),
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {},
    );
  },

  async down() {},
};
