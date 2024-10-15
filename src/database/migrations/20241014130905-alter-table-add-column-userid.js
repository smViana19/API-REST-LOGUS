'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.addColumn('anos_series', 'user_id', {
      type: Sequelize.INTEGER,
      references: {
        model: 'users', // Nome da tabela relacionada
        key: 'id', // Chave estrangeira
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    });
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.removeColumn('anos_series', 'user_id');
  }
};
