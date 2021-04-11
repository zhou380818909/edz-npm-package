/*
 * @Author: ChouEric
 * @Date: 2021-04-02 10:51:02
 * @Last Modified by: ChouEric
 * @Last Modified time: 2021-04-04 21:46:19
 * @Description: 描述 prettier 插件的配置文件, 利用prettier来格式化代码. 配置 https://prettier.io/docs/en/options.html
 *  .eslintrc.js 的 extends 配置
 *
    'prettier',
    // 解决 eslint的规则和prettier规则冲突的问题
    'eslint-config-prettier',
 */

module.exports = {
  // parser: 'typescript',
  trailingComma: 'es5',
  tabWidth: 2,
  useTabs: false,
  semi: false,
  singleQuote: true,
  arrowParens: 'avoid',
}
