'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('notas', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      trimester: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      value: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'id',
          allowNull: false,
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      anos_series_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'anos_series',
          key: 'id',
          allowNull: false,
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      subject_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'subjects',
          key: 'id',
          allowNull: false,
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
    })

  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('notas')

  }
};
