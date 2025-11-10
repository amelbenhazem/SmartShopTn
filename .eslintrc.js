module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
    jest: true,
  },
  extends: ['eslint:recommended'],
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module',
  },
  rules: {
    'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
    'no-console': ['warn', { allow: ['warn', 'error'] }],
  },
  overrides: [
    {
      files: ['frontend/**/*.js', 'frontend/**/*.jsx'],
      env: {
        browser: true,
        es2021: true,
      },
      extends: ['eslint:recommended', 'plugin:react/recommended'],
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        ecmaVersion: 2021,
        sourceType: 'module',
      },
      plugins: ['react'],
      rules: {
        'react/react-in-jsx-scope': 'off',
        'react/prop-types': 'off',
      },
    },
  ],
};


