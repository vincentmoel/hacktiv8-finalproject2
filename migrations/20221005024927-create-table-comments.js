'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('comments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      photo_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      comment: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });

    await queryInterface.addConstraint('comments', {
      type: 'foreign key',
      name : 'USER_ID',
      fields : ['user_id'],
      references: {
        table: 'users',
        field: 'id'
      },
    });

    await queryInterface.addConstraint('comments', {
      type: 'foreign key',
      name : 'PHOTO_ID',
      fields : ['photo_id'],
      references: {
        table: 'photos',
        field: 'id'
      },
      onUpdate: 'cascade',
      onDelete: 'cascade'
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('comments');
  }
};
