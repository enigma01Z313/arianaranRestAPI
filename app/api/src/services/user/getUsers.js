const { User } = require("../../../db/models");
const fError = require("../../utils/fError");

const getUsers = async (req, res, next) => {
  const { defaultOptions, paginationedOptions } = res.dbOptions;

  const items = await User.findAll(defaultOptions);
  const pagedItems = await User.findAll(paginationedOptions);

  if (items.length === 0)
    return next(
      fError(404, "There are not users yet", "نقش کاربری ای وجود ندارد")
    );

  res.jsonData = {
    data: pagedItems,
    total: items.length,
  };

  return next();
};

module.exports = getUsers;
