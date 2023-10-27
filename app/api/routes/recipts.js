const express = require("express");
const router = express.Router();
const use = require("../src/utils/use");
const serveJson = require("../src/middleware/serveJson");
const reciptBatchUnique = require("../src/middleware/unique/receptBatch");
const filteredData = require("../src/middleware/gets/filteredData");
const getDataList = require("../src/middleware/gets/getDataList");
const getDataByUUID = require("../src/middleware/gets/getDataByUUID");

const {
  uploadFile,
  uploadReceptBatch,
  deleteReciptBatch,
} = require("../src/services");

router.get("/", use(getDataList("ReceptBatch", "لیست حقوق")), serveJson);

router.post(
  "/",
  // use(getReciptBatch),
  use(
    uploadFile({
      name: "reciptFile",
      types: [["zip"], "ci"],
      maxAllowedSize: "100Kb",
    })
  ),
  // use(reciptBatchUnique),
  // uploadReceptBatch,
  serveJson
);

router.delete(
  "/:uuid",
  use(getDataByUUID("ReceptBatch", "لیست فیش حقوقی", "File")),
  use(deleteReciptBatch),
  serveJson
);

module.exports = router;
