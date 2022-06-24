"use strict";
const { v4: uuidv4 } = require("uuid");

const administratorPermissions = [
  "SEE_ROLES",
  "ADD_ROLES",
  "EDIT_ROLES",
  "SEE_USERS",
  "ADD_USERS",
  "EDIT_USERS",
  "UPLOAD_RECEIPTS",
  "SEE_ALL_RECEIPTS",
  "SEND_BROADCAST_SMS",
];

const superUserPermissions = ["SUPERUSER", ...administratorPermissions];

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "roles",
      [
        {
          uuid: uuidv4(),
          name: "FSUPERUSER",
          permissions: JSON.stringify(superUserPermissions),
          status: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          uuid: uuidv4(),
          name: "Administrator",
          label: "مدیر کل",
          permissions: JSON.stringify(administratorPermissions),
          status: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("roles", null, {});
  },
};
