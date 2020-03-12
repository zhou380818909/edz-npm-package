# 项目名

易点租公共函数库

## 特性

特性简介

- edz-utils/validate 验证函数集合
- 特性 2

## 如何使用

```typescript
import { isTelMobile } from 'edz-utils'

const b = isTelMobile('18610502298')
console.log('isTelMobile', b)
```

## API 解释

```typescript
# 校验方法

# 是否大于0
export declare const isAboveZero: (value: number) => boolean;

# 是否非空
export declare const isNotNull: (value: string) => boolean;

# 是否必填
export declare const isRequired: (value: string) => boolean;

# 是否座机或手机
export declare const isTelMobile: (value: string) => boolean;

# 是否数字和字母
export declare const isCharAndNumber: (value: string) => boolean;

# 是否是区号
export declare const isAreaNumber: (value: string) => boolean;

# 是否只是座机号，不带区号
export declare const isOnlyTel: (value: string) => boolean;

# 是否是QQ
export declare const isQQ: (value: string) => boolean;

# 是否是座机，可不带区号
export declare const isTelephone: (value: string) => boolean;

# 是否是手机号
export declare const isMobilePhone: (value: string) => boolean;

# 是否是邮政编码
export declare const isPostCode: (value: string) => boolean;

# 是否是金额
export declare const isMoney: (value: string) => boolean;

# 是否整数
export declare const isDigits: (value: string) => boolean;

# 是否是邮箱
export declare const isEmail: (value: string) => boolean;

# 是否是URL
export declare const isUrl: (value: string) => boolean;

# 是否是日期
export declare const isDate: (value: string) => boolean;
export declare const isDateISO: (value: string) => boolean;

```

## 如何打包发布

```shell
# 自动打tag和生成changelog,并修改package.json
npm run release
npm publish
```
