"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class ReceptBatch extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ReceptBatch.init(
    {
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
    },
    {
      sequelize,
      tableName: "recept_batches",
      modelName: "ReceptBatch",
    }
  );
  return ReceptBatch;
};
