const path = require('path');

/* eslint-disable no-param-reassign */
module.exports = {
  env: {
    adminUrl: process.env.NODE_ENV === 'development' ? 'http://localhost:4000/admin/api' : 'http://flip-cards.com/admin/api',
  },
  webpack: (config) => {
    config.resolve.alias.components = path.join(__dirname, 'client/components');
    config.resolve.alias.lib = './client/lib/';

    return config;
  },
};
