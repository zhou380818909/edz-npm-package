/*
 * @Author: ChouEric
 * @Date: 2020-06-19 16:19:21
 * @Last Modified by: ChouEric
<<<<<<< HEAD
 * @Last Modified time: 2020-06-21 16:32:41
=======
 * @Last Modified time: 2020-10-07 16:20:17
>>>>>>> d476648... 重新使用脚手架优化项目并且将ng-zorro升级到10, 加入钩子函数
 * @Description: stylelint配置用来做样式检查 // https://stylelint.io/user-guide/configure
 * 安装命令 npm i stylelint stylelint-config-prettier stylelint-config-sass-guidelines stylelint-config-standard stylelint-order stylelint-scss -D
 */

module.exports = {
  "extends": [
    "stylelint-config-standard",
    "stylelint-config-sass-guidelines",
    // 'stylelint-config-prettier',
  ],
  "plugins": ['stylelint-order', 'stylelint-scss'],
  // https://stylelint.io/user-guide/rules/list
  "rules": {
    "no-descending-specificity": null,
    "selector-type-no-unknown": [
      true,
      {
        "ignoreTypes": [
          "/^g2-/",
          "/^nz-/",
          "/^app-/",
          "router-outlet"
        ]
      }
    ],
    "selector-pseudo-element-no-unknown": [
      true,
      {
        "ignorePseudoElements": [
          "ng-deep"
        ]
      }
    ],
    "no-empty-source": null,
    "at-rule-no-unknown": null,
    "declaration-block-single-line-max-declarations": null,
    // 禁止-webkit-等前缀
    "property-no-vendor-prefix": null,
    // 禁止-webkit-等前缀
    "value-no-vendor-prefix": null,
    // 深层嵌套
    "max-nesting-depth": null,
    // 禁用类型选择器
    "selector-no-qualifying-type": null,
    // 组合选择器
    "selector-max-compound-selectors": null,
    // 禁止选择器空规则
    "block-no-empty": null,
  },
  "ignoreFiles": [
    "src/assets/**/*",
    "src/theme.less"
  ]
}
