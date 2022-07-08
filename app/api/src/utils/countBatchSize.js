const path = require("path");
const { unzip } = require("unzipit");

const countBatchSize = async (file) => {
  console.log(file);
  // const data = await unzip()

  console.log("start unzipping");
  await setTimeout(function () {
    console.log("unzipping and counting");
  }, 4000);
  return 12;
};

module.exports = countBatchSize;
