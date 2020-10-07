/* eslint-disable max-len */
/*
 * @Author: ChouEric
 * @Date: 2020-06-19 16:18:42
 * @Last Modified by: ChouEric
 * @Last Modified time: 2020-10-07 16:28:31
 * @Description: eslint检查js代码, 目前已经支持ts, 配合@typescript-eslint/parser https://eslint.org/docs/user-guide/configuring
 * 安装命令 npm i eslint @typescript-eslint/parser  @typescript-eslint/eslint-plugin eslint-config-airbnb-base eslint-config-airbnb-typescript eslint-plugin-import -D
 * 目前根目录下的js文件, 除了此文件和proxy.conf.js, 其他(.husky.js, .lintstagedrc.js, .stylelintrc.js)在eslint中不生效
*/

module.exports = {
  env: {
    browser: true,
    es2020: true,
  },
  extends: [
    'airbnb-base',
    'airbnb-typescript/base',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 11,
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.app.json', './projects/edz-ng2-library/tsconfig.lib.json'],
  },
  ignorePatterns: ['**/*.spec.ts', 'e2e/**/*', 'karma.conf.js', '**/test.ts'],
  plugins: [
    '@typescript-eslint',
  ],
  // https://eslint.org/docs/rules/
  rules: {
    // 强制无分号
    semi: ['error', 'never'],
    // ts强制无分号
    '@typescript-eslint/semi': ['error', 'never'],
    // 控制台
    'no-console': ['error', { allow: ['warn', 'error', 'clear'] }],
    // 每行最大长度
    'max-len': ['error', { code: 140 }],
    // 单文件最大导出类
    'max-classes-per-file': ['error', Infinity],
    // 类中方法必须使用this
    'class-methods-use-this': 0,
    // 不允许在函数内重新赋值参数
    'no-param-reassign': 0,
    // 不允许累加
    'no-plusplus': 0,
    // 箭头函数在需要的时候才需要括号
    'arrow-parens': ['error', 'as-needed'],
    // 禁止下划线开头命名变量
    'no-underscore-dangle': 0,
    // 禁止在返回时赋值
    'no-return-assign': 0,
    // 尾随逗号, 多行模式生效
    'comma-dangle': ['error', 'always-multiline'],
    // 文件导出一个类, 使用默认导出
    'import/prefer-default-export': 0,
    'object-curly-newline': 0,
    // 禁用空的构造函数
    'no-useless-constructor': 0,
    '@typescript-eslint/no-useless-constructor': 0,
    // 禁用空的方法
    'no-empty-function': 0,
    '@typescript-eslint/no-empty-function': 0,
    // 类成员必须行隔开
    'lines-between-class-members': 0,
    '@typescript-eslint/lines-between-class-members': 0,
  },
}
