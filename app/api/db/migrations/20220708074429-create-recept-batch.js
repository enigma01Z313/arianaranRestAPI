'use strict';
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('recept_batches', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      uuid: {
        allowNull: false,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      year: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      month: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      fieldId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        field: 'field_id'
      },
      total: {
        allowNull: false,
        type: DataTypes.INTEGER,
        defaultValue: 0
      },
      confirmed: {
        allowNull: false,
        type: DataTypes.INTEGER,
        defaultValue: 0
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
    });
  },
  async down(queryInterface, DataTypes) {
    await queryInterface.dropTable('recept_batches');
  }
};