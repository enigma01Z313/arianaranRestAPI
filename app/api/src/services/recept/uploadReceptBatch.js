// const path = require("path");
// const decompress = require("decompress");
// const countBatchSize = require("../../utils/countBatchSize");
const { ReceptBatch } = require("../../../db/models");

const uploadReceptBatch = async (req, res, next) => {

  const {
    formFields: { year, month },
    file: { id: fileId },
  } = res;

  const batch = await ReceptBatch.create({ year, month, fileId, total: -1 });

  res.statusCode = 201;
  res.jsonData = batch;
  next();

  // const files = await decompress(
  //   path.resolve("./", "app/filemanager", file.path),
  //   path.resolve("./", "app/tmp")
  // );
  // console.log(files);

  // const batchCount = await countBatchSize(file);
  // console.log('ssssss', batchCount);

  // console.log(year, month, fileId, batchCount);
};

module.exports = uploadReceptBatch;
