module.exports = {
  env: {
    es2021: true,
    mocha: true,
    node: true,
  },

  extends: [
    'eslint:recommended',
    'airbnb',
  ],

  rules: {
    'linebreak-style': 0,
    'prefer-destructuring': 0,
  },
};
