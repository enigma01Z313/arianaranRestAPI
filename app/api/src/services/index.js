"use strict";

const fs = require("fs");
const path = require("path");
const basename = path.basename(__filename);
const servicesPackage = {};

fs.readdirSync(__dirname)
  .filter((dir) => dir.indexOf(".") === -1)
  .forEach((dir) => {
    fs.readdirSync(path.join(__dirname, `./${dir}`))
      .filter((file) => file !== "index.js" && !file.includes("_"))
      .forEach((file) => {
        // console.log(file);

        if (file.indexOf(".") === -1) {
          fs.readdirSync(path.join(__dirname, `./${dir}`, `./${file}`))
            .filter(
              (innerFile) =>
                innerFile !== "index.js" && !innerFile.includes("_")
            )
            .forEach((innerFIle) => {
              const fileName = innerFIle.split(".");
              const service = require(path.join(
                __dirname,
                dir,
                file,
                innerFIle
              ));
              const packageName = `${dir}${file.toUpperCase()}`;

              servicesPackage[packageName] = servicesPackage[packageName] ?? {};
              servicesPackage[packageName][fileName[0]] = service;
            });
        } else {
          const fileName = file.split(".");
          const service = require(path.join(__dirname, dir, file));
          servicesPackage[fileName[0]] = service;
        }
      });
  });

module.exports = servicesPackage;
