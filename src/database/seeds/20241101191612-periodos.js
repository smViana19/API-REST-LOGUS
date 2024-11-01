'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const periods = [];
    const numberOfPeriods = 3;

    const periodData = [
      {
        name: "1º Trimestre",
        start_date: "2024-01-01T00:00:00.000Z",
        end_date: "2024-03-31T00:00:00.000Z"
      },
      {
        name: "2º Trimestre",
        start_date: "2024-04-01T00:00:00.000Z",
        end_date: "2024-06-30T00:00:00.000Z"
      },
      {
        id: 3,
        name: "3º Trimestre",
        start_date: "2024-07-01T00:00:00.000Z",
        end_date: "2024-09-30T00:00:00.000Z"
      }
    ];

    for (let i = 0; i < numberOfPeriods; i++) {
      periods.push(periodData[i]);
    }
    await queryInterface.bulkInsert("periods", periods, {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("periods", null, {})
  }
};
