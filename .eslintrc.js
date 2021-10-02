/* eslint-disable linebreak-style */
module.exports = {
  env: {
    browser: true,
    es2021: true,
    jquery: true,
  },
  extends: [
    'airbnb-base/legacy',
    'plugin:fsd/all'
  ],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['fsd'],
  rules: {
    'prettier/prettier': [0, { singleQuote: true, parser: 'flow' }],
    'class-methods-use-this': 0,
    'no-param-reassign': 0,
    'comma-dangle': 0,
    'no-prototype-builtins': 0,
    'no-underscore-dangle': 0,
    semi: 0,
    quotes: 0,
    'func-names': 0
  },
};
