const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mysql = require("mysql2");
const { dbUrl, dbHost, dbUser, dbPass } = require("../config/dbMysql");

// const mongoose = require("mongoose");
// mongoose.connect(dbUrl);
// const mongoDB = mongoose.connection;
// mongoDB.on("error", (err) => {
//   console.log("DATABASE ERROR:");
//   console.log(err);
// });

//mysql database conncetion
const mysqlDB = mysql.createConnection({
  host: dbHost,
  user: dbUser,
  password: dbPass,
});
mysqlDB.connect(function (err) {
  if (err) throw err;
  console.log("mysql Connected!");
});

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
