'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.removeConstraint('subjects_material', 'subjects_material_ibfk_2');
    await queryInterface.addConstraint('subjects_material', {
      fields: ['subject_id'],
      type: 'foreign key',
      name: 'subjects_material_ibfk_2',
      references: {
        table: 'subjects',
        field: 'id',
      },
      onDelete: 'CASCADE',
    });
    await queryInterface.removeConstraint('subjects_material', 'subjects_material_ibfk_1');
    await queryInterface.addConstraint('subjects_material', {
      fields: ['user_id'],
      type: 'foreign key',
      name: 'subjects_material_ibfk_1',
      references: {
        table: 'users',
        field: 'id',
      },
      onDelete: 'CASCADE',
    });
  },


  async down (queryInterface, Sequelize) {
    await queryInterface.removeConstraint('subjects_material', 'subjects_material_ibfk_2');
    await queryInterface.addConstraint('subjects_material', {
      fields: ['subject_id'],
      type: 'foreign key',
      name: 'subjects_material_ibfk_2',
      references: {
        table: 'subjects',
        field: 'id',
      },
    });
    await queryInterface.removeConstraint('subjects_material', 'subjects_material_ibfk_1');
    await queryInterface.addConstraint('subjects_material', {
      fields: ['user_id'],
      type: 'foreign key',
      name: 'subjects_material_ibfk_1',
      references: {
        table: 'users',
        field: 'id',
      },
    });
  }
};
