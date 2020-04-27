module.exports = function (wallaby) {
  return {
    files: [
      '**/*.js'
    ],
    tests: [
      'test/**/*.spec.js'
    ],
  };
};