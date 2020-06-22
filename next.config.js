const path = require('path');

/* eslint-disable no-param-reassign */
module.exports = {
  env: {
    adminUrl: process.env.NODE_ENV === 'development'
      ? 'http://localhost:4000/admin/api'
      : '/admin/api',
  },
  webpack: (config) => {
    config.resolve.alias.client = path.join(__dirname, 'client');
    config.resolve.alias.components = path.join(__dirname, 'client/components');
    config.resolve.alias.lib = path.join(__dirname, 'client/lib');

    return config;
  },
};
