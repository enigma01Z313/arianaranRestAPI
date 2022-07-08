const express = require("express");
const router = express.Router();
const use = require("../src/utils/use");

const { uploadFile, uploadReceptBatch } = require("../src/services");

router.post(
  "/",
  // use(getReciptBatch),
  use(
    uploadFile({
      name: "reciptFile",
      types: [["zip"], "ci"],
      maxAllowedSize: "100Kb",
    })
  ),uploadReceptBatch
);

module.exports = router;
