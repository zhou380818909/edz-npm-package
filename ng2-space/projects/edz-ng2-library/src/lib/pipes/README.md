## 指令模块
###  1. 千分数字管道, 通过正则时间
```html
  <span>{{data | finance}}</span>
```
### 2. 时间管道, 解决Safari兼容性的问题, 参数为 date-fns 的格式化参数
```html
  <span>{{date | time: 'yyyy-MM-dd HH:mm:ss'}}</span>
```
