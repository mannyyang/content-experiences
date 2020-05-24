const {
  Text,
  CalendarDay,
} = require('@keystonejs/fields');

module.exports = {
  fields: {
    // old field names (keeping around for backwards support, these should be
    // removed later)
    front: {
      type: Text,
    },
    back: {
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
