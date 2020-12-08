## 指令模块
###  1. 滚动指令
实现区域滚动, 利用flex布局实现上下布局,上面的元素在上面,下面元素的高度占剩余高度,并且下面的元素在剩余高度内滚动
1. 指令依赖于flex布局, 并且在本组件内的根路由元素也实现了flex布局.
1. edz-scroll 指令作用于父元素
1. edz-scroll-content 指令作用于需要滚动的元素
```html
<div edz-scroll>
  <div>此元素在上面,固定不动</div>
  <div edz-scroll-content>此元素在下面,在剩余高度内滚动</div>
</div>

```
