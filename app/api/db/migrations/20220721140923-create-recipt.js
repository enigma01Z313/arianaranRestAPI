'use strict';
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('recipts', {
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
      batchId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        field: 'batch_id'
      },
      personelCode: {
        allowNull: false,
        type: DataTypes.STRING,
        field: 'personel_code'
      },
      data: {
        allowNull: false,
        type: DataTypes.STRING,
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
    await queryInterface.dropTable('recipts');
  }
};