const { Op } = require("sequelize");

const filteredData =
  (exclude = {}, translatedModel) =>
  (req, res, next) => {
    const whereOptions = [];
    whereOptions.push(exclude);
    const { page, limit, status } = req.query;
    const { setLang } = res;

    //filters section
    if (status) whereOptions.push({ status });
    if (setLang)
      whereOptions.push({
        [`$${translatedModel}Translations.lang$`]: setLang,
      });

    const defaultOptions = { where: { [Op.and]: [...whereOptions] } };
    const paginationedOptions = Object.assign({}, defaultOptions);

    //pagination section
    if (limit) paginationedOptions.limit = parseInt(limit);
    if (page) {
      const limits = limit ?? 10;
      const pageNum = page > 0 ? parseInt(page) - 1 : 0;

      paginationedOptions.limit = parseInt(limits);
      paginationedOptions.offset = pageNum * parseInt(limits);
    }


    res.dbOptions = { defaultOptions, paginationedOptions };
    next();
  };

module.exports = filteredData;
