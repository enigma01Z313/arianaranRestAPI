const Models = require("../../../db/models");
const fError = require("../../utils/fError");

class GetData {
  constructor(key) {
    this.key = key;
  }

  createIncludeArray = (str) => {
    if (!str) return { include: [] };

    return { include: str.split(",") };
  };

  get() {
    return (model, modelFa, includeModels) => async (req, res, next) => {
      const value = req.params[this.key];

      const item = await Models[model].findOne({
        where: { [this.key]: value },
        ...this.createIncludeArray(includeModels),
      });

      if (!item)
        return next(
          fError(
            404,
            `Not found: '${model}' with id '${uuid}' does not exist`,
            `یافت نشد: ${modelFa} با ${uuid} وجود ندارد`
          )
        );

      res.jsonData = item;
      next();
    };
  }
}

module.exports = GetData;
