const bcryptjs = require('bcryptjs');
const { faker } = require('@faker-js/faker'); // Importando o faker

"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    const users = [];
    const numberOfUsers = 10; // Defina quantos usuários deseja criar

    for (let i = 0; i < numberOfUsers; i++) {
      users.push({
        nome: faker.person.firstName(),
        email: faker.internet.email({ email: "aluno" }),
        password_hash: await bcryptjs.hash('123456', 8),
        role: faker.helpers.arrayElement(['estudante', 'professor']),
        created_at: new Date(),
        updated_at: new Date(),
      });
    }

    await queryInterface.bulkInsert("users", users, {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("users", null, {});
  },
};
