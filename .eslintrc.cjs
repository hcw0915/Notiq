module.exports = {
  root: true,
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    '@electron-toolkit/eslint-config-ts/recommended',
    '@electron-toolkit/eslint-config-prettier'
  ],
  plugins: ['simple-import-sort'],
  rules: {
    'simple-import-sort/exports': 'error',
    'simple-import-sort/imports': [
      'error',
      {
        groups: [
          // 1. React and third-party packages (node_modules)
          ['^react', '^\\w'],
          // 2. Internal components and modules (aliases like @components)
          ['^@', '^[^.]'],
          // 3. Static files: Images, SVGs, and styles (css, scss, etc.)
          ['^.+\\.(png|jpg|svg|css|scss)$']
        ]
      }
    ],
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-unused-vars': 'off'
  },
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 'latest'
  }
}
