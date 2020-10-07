/*
 * @Author: ChouEric
 * @Date: 2020-06-19 16:21:20
 * @Last Modified by: ChouEric
 * @Last Modified time: 2020-09-30 17:35:26
 * @Description: 只有在git中检测变动的文件才执行检测脚本 https://github.com/okonet/lint-staged#readme
 * npm i lint-staged -D
 */

module.exports = {
  // 校验ts文件
  "src/**/*.ts": [
    "npm run lint:ts"
  ],
  // 校验scss文件
  "*.scss": [
    "npm run lint:scss"
  ],
}
