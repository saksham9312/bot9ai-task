'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.createTable('Users',{
      username: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING
    })
  }
};
