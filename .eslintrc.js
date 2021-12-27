/* eslint-disable linebreak-style */
module.exports = {
  env: {
    browser: true,
    es2021: true,
    jquery: true,
  },
  extends: [
    'airbnb-base/legacy',
  ],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  rules: {
    'prettier/prettier': [0, { singleQuote: true, parser: 'flow' }],
    'class-methods-use-this': 0,
    'no-param-reassign': 0,
    'comma-dangle': 0,
    'no-prototype-builtins': 0,
    'no-underscore-dangle': 0,
    "semi": [2, "always"],
    quotes: 0,
    'func-names': 0,
    'no-unused-vars': 0
  },
};
