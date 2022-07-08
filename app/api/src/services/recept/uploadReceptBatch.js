const path = require("path");
const { ReceptBatch } = require("../../../db/models");
const countBatchSize = require("../../utils/countBatchSize");

const uploadReceptBatch = async (req, res, next) => {
  const { year, month } = res.formFields;
  const { file } = res;
  const fileId = file.id;

  // const entetis = await unzip(path.resolve("./", "app/filemanager", file.path));

  
  // const batchCount = await countBatchSize(file);
  // console.log('ssssss', batchCount);

  // console.log(year, month, fileId, batchCount);

  // const batch = ReceptBatch.craete({year, month, fileId})

  return res.end("uploading file");
};

module.exports = uploadReceptBatch;
