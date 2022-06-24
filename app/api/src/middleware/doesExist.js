const Models = require("../../db/models");
const fError = require("../utils/fError");

const doesExist =
  (model, modelFa, param, paramFa) => async (req, res, next) => {
    const keyParam = req.body[param];

    if (!keyParam) return next();

    const item = await Models[model].findOne({ where: { uuid: keyParam } });

    if (!item)
      return next(
        fError(
          400,
          `Duplicate entry: '${model}' with id: '${keyParam}' does not exist`,
          `${modelFa} با ${paramFa}  فراخوانی شده، وجود ندارد`
        )
      );

    res[model] = item;
    return next();
  };

module.exports = doesExist;
