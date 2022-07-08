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
const getDataByUUID = require("../src/middleware/gets/getDataByUUID");

const {
  updateUser,
  addUser,
  getUsers,
} = require("../src/services");

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

const updatedUserSchema = new ValidateF()
  .param("phone", "شماره موبایل")
  .string()
  .regex(/^09[0-9]{9}$/)
  .param("nationalCode", "کد ملی")
  .maximum(11)
  .string()
  .param("employeeCode", "کد مستخدم")
  .string()
  .param("firstName", "نام")
  .string()
  .param("lastName", "نام خانوادگی")
  .string()
  .param("imageId", "آیدی تصویر")
  .string()
  .length(36)
  .param("status", "وضعیت")
  .number()
  .param("roleId", "آیدی نقش")
  .string()
  .length(36)
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
  use(isUnique("User", "کاربر", "phone", "شماره تماس")),
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
  (req, res) => res.end('aaaaaa'),
  serveJson
);

router.get(
  "/:uuid",
  use(authentication),
  use(authorization.def("SEE_USERS")),
  use(getDataByUUID("User", "نقش کاربری", "Role")),
  serveJson
);

router.put(
  "/:uuid",
  use(validator(updatedUserSchema)),
  use(authentication),
  use(authorization.or(["SEE_USERS", "EDIT_USERS"])),
  use(isUnique("User", "کاربر", "phone", "شماره موبایل")),
  use(isUnique("User", "کاربر", "nationalCode", "کد ملی")),
  use(isUnique("User", "کاربر", "employeeCode", "کد مستخدم")),
  use(doesExist("Role", "نقش کاربری", "roleId", "آیدی")),
  use(getDataByUUID("User", "نقش کاربری", "Role")),
  updateUser,
  serveJson
);

module.exports = router;
