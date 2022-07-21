const fs = require("fs");
const path = require("path");
const { ReceptBatch, File } = require("../../../db/models");

const deleteReciptBatch = async (req, res, next) => {
  const {
    jsonData: {
      uuid: reciptBatchId,
      File: { uuid: fileId, path: filePath },
    },
  } = res;

  await ReceptBatch.destroy({
    where: { uuid: reciptBatchId },
  });

  await File.destroy({
    where: { uuid: fileId },
  });

  fs.unlinkSync(path.resolve("./", "app/filemanager", filePath));

  res.statusCode = 200;
  res.jsonData = {};
  next();
};
module.exports = deleteReciptBatch;
