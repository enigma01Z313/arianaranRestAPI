const updateUser = async (req, res, next) => {
  let uppedData = false;
  const {
    jsonData: user,
    Role: { id: roleId },
  } = res;
  const {
    phone,
    nationalCode,
    employeeCode,
    firstName,
    lastName,
    imageId,
    status,
  } = req.body;

  if (phone && phone !== user.phone) user.phone = uppedData = phone;

  if (nationalCode && nationalCode !== user.nationalCode)
    user.nationalCode = uppedData = nationalCode;

  if (employeeCode && employeeCode !== user.employeeCode)
    user.employeeCode = uppedData = employeeCode;

  if (firstName && firstName !== user.firstName)
    user.firstName = uppedData = firstName;

  if (lastName && lastName !== user.lastName)
    user.lastName = uppedData = lastName;

  if (imageId && imageId !== user.imageId) user.imageId = uppedData = imageId;

  if (typeof status !== typeof undefined && status !== user.status)
    user.status = uppedData = status;

  if (roleId && roleId !== user.roleId) user.roleId = uppedData = roleId;

  if (uppedData === false) {
    res.statusCode = 204;
    return next();
  }

  res.jsonData = await user.save();

  next();
};

module.exports = updateUser;
