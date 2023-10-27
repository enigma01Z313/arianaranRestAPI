const formidable = require("formidable");
const path = require("path");
const fs = require("fs");
const { File } = require("../../../db/models");
const fError = require("../../utils/fError");
const sizeValidation = require("./_sizeValidation");
const extensionValidation = require("./_extensionValidation");

const uploadFile =
  ({ name: fileName, types: fileTypes, maxAllowedSize: fileMaxAllowedSize }) =>
  async (req, res, next) => {
    const form = new formidable.IncomingForm();
    form.uploadDir = path.resolve("./", "app/tmp/");

    form.parse(req, function (err, fields, files) {
      res.formFields = fields;

      const theFileName = files[fileName].originalFilename;
      const theFileExtension = theFileName.split(".").slice(-1)[0];
      const theFileSize = files[fileName].size;

      if (!sizeValidation(theFileSize, fileMaxAllowedSize))
        return next(
          fError(
            400,
            `file is too big, max-size: ${fileMaxAllowedSize}`,
            `حجم فایل بیش از حد مجاز است، حجم مجاز: ${fileMaxAllowedSize}`
          )
        );

      if (!extensionValidation(theFileExtension, fileTypes))
        return next(
          fError(
            400,
            `wrong format, acceptable formats: ${fileTypes.join(", ")}`,
            `فرمت فایل غیر مجاز میباشد، فرمت های مجاز: ${fileTypes.join(", ")}`
          )
        );

      const fileNewName = `${(Math.random() * 3000).toString(
        36
      )}.${theFileExtension}`;
      const oldPath = files[fileName].filepath;
      const newPath = path.resolve("./", "app/filemanager/", fileNewName);

      fs.rename(oldPath, newPath, async function (err) {
        if (err)
          return next(
            fError(500, err.message, "خطای آپلود فایل، مجدد تلاش نمایید")
          );

        console.log(oldPath);
        console.log(newPath);
        return res.end("55555555555555555555");

        const file = await File.create({
          path: fileNewName,
          name: theFileName,
        });
        res.file = file;
        next();
      });
    });
  };

module.exports = uploadFile;
