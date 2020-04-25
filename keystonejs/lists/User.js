const { Text, Checkbox, Password, Relationship } = require('@keystonejs/fields');
const access = require('../access');

console.log(access);

// Access control functions
// const userIsAdmin = ({ authentication: { item: user } }) => Boolean(user && user.isAdmin);
// const userOwnsItem = ({ authentication: { item: user } }) => {
//   if (!user) {
//     return false;
//   }
//   return { id: user.id };
// };
// const userIsAdminOrOwner = auth => {
//   const isAdmin = access.userIsAdmin(auth);
//   const isOwner = access.userOwnsItem(auth);
//   return isAdmin ? isAdmin : isOwner;
// };

// const access = { userIsAdmin, userOwnsItem, userIsAdminOrOwner };

module.exports = {
  fields: {
    name: { type: Text },
    email: {
      type: Text,
      isUnique: true,
    },
    isAdmin: {
      type: Checkbox,
      // Field-level access controls
      // Here, we set more restrictive field access so a non-admin cannot make themselves admin.
      access: {
        update: access.userIsAdmin,
      },
    },
    password: {
      type: Password,
    },
    task: {
      type: Relationship,
      ref: 'Todo.assignee',
      many: true,
    }
  },
  // List-level access controls
  access: {
    read: access.userIsAdminOrOwner,
    update: access.userIsAdminOrOwner,
    create: access.userIsAdmin,
    delete: access.userIsAdmin,
    auth: true,
  },
};