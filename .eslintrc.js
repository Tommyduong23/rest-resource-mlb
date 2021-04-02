module.exports = {
  root: true,

  env: {
    node: true,
  },

  extends: ['plugin:vue/recommended', 'eslint:recommended', '@vue/prettier', 'standard'],

  parserOptions: {
    parser: 'babel-eslint',
  },

  rules: {
    'no-console': 'off',
    'no-debugger': 'off',
    // allow paren-less arrow functions
    'arrow-parens': 0,
    // allow async-await
    'generator-star-spacing': 0,
    // allow debugger during development
    //'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0
    'no-debugger': 0, 
  },

  overrides: [
    {
      files: [
        '**/__tests__/*.{j,t}s?(x)',
        '**/tests/unit/**/*.spec.{j,t}s?(x)',
      ],
      env: {
        mocha: true,
      },
    },
  ],

  extends: 'vuetify',
  'extends': 'plugin:vue/recommended'
}
