module.exports = {
  'env': {
    'browser': true,
    'commonjs': true,
    'es2021': true,
  },
  'extends': [
    'google',
  ],
  'parserOptions': {
    'ecmaVersion': 12,
  },
  'rules': {
    'require-jsdoc': 'off',
    'guard-for-in': 'off',
    'no-throw-literal': 'off',
    'no-implicit-globals': 'error',
    'max-len': ['error', {'code': 100}],
  },
};
