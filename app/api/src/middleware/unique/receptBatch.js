const { ReceptBatch } = require("../../../db/models");
const fError = require("../../utils/fError");

const reciptBatchUnique = async (req, res, next) => {
  const {
    formFields: { year, month },
  } = res;

  const batch = await ReceptBatch.findOne({ where: { year, month } });
  if (batch && batch.uuid !== req.params.uuid)
    return next(
      fError(
        400,
        `Duplicate entry: another 'Recept Batch' with year '${year}' and month '${month}' exists`,
        `تارخ تکراری میباشد`
      )
    );

  return next();
};

module.exports = reciptBatchUnique;
