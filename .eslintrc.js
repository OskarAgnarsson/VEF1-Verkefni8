module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 12,
  },
  rules: {
    "brace-style": ["error", "stroustrup"],
    "no-plusplus": ["error", { "allowForLoopAfterthoughts": true }],
    "no-lonely-if": "off"
  },
};
