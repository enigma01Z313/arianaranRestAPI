"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class ReceptBatch extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({File}) {
      // define association here
      this.belongsTo(File, { foreignKey: "file_id" })
    }

    toJSON() {
      return {
        ...this.get(),
        id: this.uuid,
        total: this.total >= 0 ? this.total : "-",
        filePath: this.get()?.File?.path,
        fileName: this.get()?.File?.name,
        fileId: undefined,
        file_id: undefined,
        File: undefined,
        uuid: undefined,
      };
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
      fileId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        field: "file_id",
      },
      total: {
        allowNull: false,
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      confirmed: {
        allowNull: false,
        type: DataTypes.INTEGER,
        defaultValue: 0,
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
