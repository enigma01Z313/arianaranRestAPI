const express = require("express");
const router = express.Router();
const use = require("../src/utils/use");
const serveJson = require("../src/middleware/serveJson");
const { ValidateF, validator } = require("../src/middleware/validate");
const getDataByUUID = require("../src/middleware/gets/getDataByUUID");

const {
  authornticate,
  oneTimeLogin,
  oneTimeConfirm,
} = require("../src/services");

/**************************/
/*   validation schemas   */
/**************************/
const loginSchema = new ValidateF()
  .phoneSchema()
  .param("password", "رمز عبور")
  .required()
  .done();

const phoneSchema = new ValidateF().phoneSchema().done();

const confirmCodeSchema = new ValidateF()
  .param("confirmCode", "کد تایید")
  .required()
  .length(6)
  .done();

/**************************/
/*         routes         */
/**************************/
router.post(
  "/login",
  use(validator(loginSchema)),
  use(authornticate),
  serveJson
);

router.post("/", use(validator(phoneSchema)), use(oneTimeLogin), serveJson);

router.post(
  "/:uuid",
  use(validator(confirmCodeSchema)),
  use(getDataByUUID("User", "نقش کاربری", "Role")),
  use(oneTimeConfirm),
  serveJson
);

module.exports = router;
