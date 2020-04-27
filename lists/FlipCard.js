const {
  Text, 
  CalendarDay, 
  Checkbox, 
  Relationship,
} = require('@keystonejs/fields');
const constants = require('../constants');

module.exports = {
  fields: {
    // existing fields
    front: {
      type: Text,
    },
    back: {
      type: Text,
    },
    description: {
      type: Text,
    },
    // added fields
    createdAt: {
      type: CalendarDay,
      isRequired: false,
      defaultValue: new Date().toISOString('YYYY-MM-DD').substring(0, 10),
    },
  },
};
