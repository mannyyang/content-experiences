const { Text, CalendarDay, Checkbox, Relationship } = require('@keystonejs/fields');
const constants = require('../constants');

module.exports = {
  fields: {
    // existing fields
    description: {
      type: Text,
      isRequired: true,
    },
    isComplete: {
      type: Checkbox,
      defaultValue: false,
    },
    // added fields
    deadline: {
      type: CalendarDay,
      format: 'Do MMMM YYYY',
      yearRangeFrom: '2019',
      yearRangeTo: '2029',
      isRequired: false,
      defaultValue: new Date().toISOString('YYYY-MM-DD').substring(0, 10),
    },
    // assignee: {
    //   type: Relationship,
    //   ref: 'User',
    //   isRequired: false,
    // },
  },
};