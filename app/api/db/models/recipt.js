"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Recipt extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Recipt.init(
    {
      uuid: {
        allowNull: false,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      batchId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        field: "batch_id",
      },
      personelCode: {
        allowNull: false,
        type: DataTypes.STRING,
        field: "personel_code",
      },
      data: {
        allowNull: false,
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      tableName: "recipts",
      modelName: "Recipt",
    }
  );
  return Recipt;
};
