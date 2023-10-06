module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  settings: { react: { version: '18.2' } },
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
  },
  // "overrides": [
  //   {
  //     files: ["**/*.tsx"],
  //     // react默认使用prop-types来检查类型
  //     // 如果使用了typescript，就把这个关掉，
  //     // 不然会报一些没有意义的错误
  //     rules: {
  //       "react/prop-types": "off"
  //     }
  //   }
  // ]
}
