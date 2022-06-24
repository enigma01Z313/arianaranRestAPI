const { User } = require("../../../db/models");

const addUser = async (req, res, next) => {
  const {
    firstName,
    lastName,
    nationalCode,
    employeeCode,
    roleId,
    phone,
    password,
    status,
  } = req.body;

  const newUser = await User.create({
    firstName,
    lastName,
    nationalCode,
    employeeCode,
    roleId: res.Role.id,
    phone,
    password,
    status,
  });

  //add role data to created user
  const roleData = {
    role: {
      id: res.Role.uuid,
      name: res.Role.name,
      label: res.Role.label,
    },
    permissions: JSON.parse(res.Role.permissions),
  };
  const modifiedUser = { ...newUser.toJSON(), ...roleData };

  res.statusCode = 201;
  res.jsonData = modifiedUser;
  next();
};

module.exports = addUser;
