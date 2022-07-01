"use strict";
const { Model } = require("sequelize");
const path = require("path");

module.exports = (sequelize, DataTypes) => {
  class File extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */

    toJSON() {
      return {
        ...this.get(),
        path: path.resolve("./", "app/filemanager/", this.path),
        id: this.uuid,
        uuid: undefined,
      };
    }

    static associate(models) {
      // define association here
    }
  }
  File.init(
    {
      uuid: {
        allowNull: false,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      path: {
        allowNull: false,
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      tableName: "files",
      modelName: "File",
    }
  );
  return File;
};
