module.exports = {
  env: {
    adminUrl: process.env.NODE_ENV === 'development' ? 'http://localhost:4000/admin/api' : 'http://flip-cards.com/admin/api',
  },
  webpack: config => {
    config.resolve.alias['components'] = './client/components/';
    config.resolve.alias['lib'] = './client/lib/';

    return config;
  }
};
