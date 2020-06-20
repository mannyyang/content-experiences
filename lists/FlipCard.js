const {
  Text,
  CalendarDay,
} = require('@keystonejs/fields');

module.exports = {
  fields: {
    title: {
      type: Text,
    },
    // updated
    frontTitle: {
      type: Text,
    },
    backTitle: {
      type: Text,
    },
    frontImage: {
      type: Text,
    },
    backImage: {
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
