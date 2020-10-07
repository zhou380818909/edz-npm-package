/*
 * @Author: ChouEric
 * @Date: 2020-06-19 16:18:08
 * @Last Modified by: ChouEric
 * @Last Modified time: 2020-10-07 16:28:43
 * @Description: 哈士奇, 用来做git提交前的钩子调用 // https://www.npmjs.com/package/husky
 * npm i husky -D
 */

module.exports = {
  hooks: {
    'pre-commit': "lint-staged"
  }
}
