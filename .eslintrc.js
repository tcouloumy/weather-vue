module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true
  },
  extends: [
    'airbnb-base',
    'plugin:vue/recommended'
  ],
  rules: {
    'comma-dangle': ['error', 'never']
  }
};
