const { Role } = require("../../../db/models");

const addRole = async (req, res, next) => {
  const { name, permissions, label } = req.body;

  const newRole = await Role.create({
    name,
    label,
    permissions: JSON.stringify(permissions),
  });

  res.statusCode = 201;
  res.jsonData = newRole;
  next();
};

module.exports = addRole;
