const path = require("path");
const fs = require("fs");
const decompress = require("decompress");
const xml2js = require("xml2js");

const counteBatch = async (batch) => {
  //unzip file
  const files = await decompress(
    path.resolve("./", "app/filemanager", batch.toJSON().filePath),
    path.resolve("./", "app/tmp")
  );

  try {
    //read xml file
    const data = await fs.readFileSync(
      path.resolve("./", "app/tmp", `./${files[0].path}`),
      { encoding: "utf8" }
    );

    //convert xml to json
    const jsonData = await xml2js.parseStringPromise(data);
    const dataList = jsonData.Report.Tablix1[0].Details_Collection[0].Details;

    const updatedBatch = await batch.update({ total: dataList.length });

    return { dataList, updatedBatch };
  } catch (err) {
    console.log(err);
  }

  // xml2js.parseString(xml, (err, result) => {
  //   if (err) {
  //     throw err;
  //   }

  //   // `result` is a JavaScript object
  //   // convert it to a JSON string
  //   const json = JSON.stringify(result, null, 4);

  //   // log JSON string
  //   console.log(json);
  // });
};
module.exports = counteBatch;
