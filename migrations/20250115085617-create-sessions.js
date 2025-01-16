'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Sessions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      sport: {
        type: Sequelize.STRING
      },
      teamA: {
        type: Sequelize.STRING
      },
      teamB: {
        type: Sequelize.STRING
      },
      teamAsize: {
        type: Sequelize.INTEGER
      },
      teamBsize: {
        type: Sequelize.INTEGER
      },
      actualSize: {
        type: Sequelize.INTEGER
      },
      place: {
        type: Sequelize.STRING
      },
      date: {
        type: Sequelize.DATE
      },
      time: {
        type: Sequelize.TIME
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Sessions');
  }
};