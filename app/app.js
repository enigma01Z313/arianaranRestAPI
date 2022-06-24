const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
// const mongoose = require("mongoose");
// const { dbUrl } = require("../config/dbMysql");
// console.log(dbUrl);
// mongoose.connect(dbUrl);
// const db = mongoose.connection;
// db.on("error", (err) => {
//   console.log("DATABASE ERROR:");
//   console.log(err);
// });
// db.once("open", () => console.log("Database connected"));

const apiRouter = require("./api/routes");
const handleError = require("./handleError");
const handleCors = require("./handleCors");

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(handleCors);

app.use("/api", apiRouter);
app.get("/robots.txt", (req, res) => {
  res.end("robots file");
});

//handling 404 ndpoints
app.use("/", (req, res, next) => {
  const error = new Error("Resource Not Found");
  error.status = 404;
  next(error);
});

//ultimate error handler
app.use(handleError);

module.exports = app;
