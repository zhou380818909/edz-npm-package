# Ng2Space 易点租组件库项目

项目当前可运行的为组件调试工具

projects/edz-ng2-library 为 组件库源码

## 安装依赖

在当前目录 npm i 安装应用依赖;

## 启动调试

运行 npm start ，访问 `http://localhost:12233/`.

## 发布组件库版本

运行 npm publish

## 发布日志
- v2.1.9 加入overlayCloseService服务, 用来在切换路由的时候关闭除了modal以外的弹框, 直接在 app.component.ts 的服务中注入即可
- v2.1.8 http请求服务支持loading, 配置增加loading: Subject | BehaviorSubject, 可以直接在 table 的loading属性中使用异步管道
- v2.1.7 layout组件实现loading效果, 懒加载模块有loading效果, 在路由配置的data加入loading: true属性, 再引入LayoutLoadingGuard到根路由即可
- v2.1.6 优化form组件,支持双向绑定 ngModel 传入表单数据, 优化 template 和 componet 组件更新数据方式
- v2.1.5 修复form组件在全局模块导出的依赖不识别的bug, 优化组件库版本依赖的更新逻辑, 修复组件库打包的警告问题如: 采用qs代替querystring
- v2.1.4 布局组件加入 footerTitle: string | TemplateRef 属性, 可以自定脚部内容
- v2.1.3 修复table组件不传入config配置报错的bug
- v2.1.2 优化search-bar的阴影样式, isDevMode 在tab和table中的警告
- v2.1.1 将ng-zorro升级到^11, 至此ng和ng-zorro全部在^11版本. 同时优化table组件,使得table组件在数据不够的情况下,分页组件位于底部位置
