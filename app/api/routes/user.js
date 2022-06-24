const express = require("express");
const { Op } = require("sequelize");
const router = express.Router();
const use = require("../src/utils/use");
const serveJson = require("../src/middleware/serveJson");
const authentication = require("../src/middleware/auth/authentication");
const authorization = require("../src/middleware/auth/authorization");
const { ValidateF, validator } = require("../src/middleware/validate");
const isUnique = require("../src/middleware/isUnique");
const doesExist = require("../src/middleware/doesExist");
const filteredData = require("../src/middleware/filteredData");

const {
  // listPermissions,
  addUser,
  getUsers,
  // updateRole,
} = require("../src/services/user");

/**************************/
/*   validation schemas   */
/**************************/
const newUserSchema = new ValidateF()
  .param("firstName", "نام")
  .requiredString()
  .param("lastName", "نام خانوادگی")
  .requiredString()
  .param("nationalCode", "کد ملی")
  .maximum(11)
  .requiredString()
  .param("employeeCode", "شماره پرسنلی")
  .requiredString()
  .param("roleId", "نقش کاربری")
  .requiredString()
  .length(36)
  .param("phone", "شماره تماس")
  .phoneSchema()
  .param("password", "رمز عبور")
  .requiredString()
  .param("status", "وضیعیت کاربری")
  .requiredNumber()
  .done();

/**************************/
/*         routes         */
/**************************/
router.post(
  "/",
  use(validator(newUserSchema)),
  use(authentication),
  use(authorization.def("ADD_USERS")),
  use(isUnique("User", "کاربر", "nationalCode", "کد ملی")),
  use(isUnique("User", "کاربر", "employeeCode", "کد پرسنلی")),
  use(doesExist("Role", "نقش کاربری", "roleId", "آیدی")),
  use(addUser),
  serveJson
);

router.get(
  "/",
  use(authentication),
  use(authorization.def("SEE_USERS")),
  filteredData({ id: { [Op.ne]: 1 } }),
  use(getUsers),
  serveJson
);

module.exports = router;
