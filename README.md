# JavaScript 面试编程题练习

这个项目用于练习 JavaScript 面试编程题，每个题目都包含完整的测试用例。

## 项目结构

```
js-cracker/
├── src/                    # 源代码目录
│   ├── array/             # 数组相关题目
│   ├── string/            # 字符串相关题目
│   ├── function/          # 函数相关题目
│   ├── object/            # 对象相关题目
│   ├── promise/           # Promise相关题目
│   └── utils/             # 工具函数题目
├── solutions/             # 标准答案目录
│   ├── array/
│   ├── string/
│   ├── function/
│   ├── object/
│   ├── promise/
│   └── utils/
├── my-solutions/          # 用户代码目录（请在这里编写你的答案）
│   ├── array/
│   ├── string/
│   ├── function/
│   ├── object/
│   ├── promise/
│   └── utils/
├── test/                  # 测试用例目录
│   ├── array/
│   ├── string/
│   ├── function/
│   ├── object/
│   ├── promise/
│   └── utils/
└── README.md
```

## 环境要求

- Node.js >= 16
- pnpm >= 8

## 如何使用

1. 安装 pnpm（如果尚未安装）：

```bash
npm install -g pnpm
```

2. 安装依赖：

```bash
pnpm install
```

## 如何练习

1. 在 `src` 目录下找到要练习的题目
2. 在 `my-solutions` 目录下创建对应的文件，编写你的答案
3. 运行测试验证你的答案
4. 如果需要参考标准答案，可以查看 `solutions` 目录

## 题目列表

### 数组相关

1. 数组去重（多种方法实现）
2. 数组扁平化（flat 方法的实现）
3. 数组分组（groupBy 实现）
4. 数组交集、并集、差集
5. 数组排序（自定义排序规则）

### 字符串相关

1. 模板字符串解析器
2. 驼峰命名转换（camelCase、kebab-case、snake_case 互转）
3. 字符串压缩（如：'aaabbc' => 'a3b2c1'）
4. 千分位格式化（如：1234567 => '1,234,567'）
5. 字符串转义（HTML 特殊字符转义）

### 函数相关

1. 函数柯里化（curry）
2. 函数防抖（debounce）
3. 函数节流（throttle）
4. 函数组合（compose）
5. 偏函数（partial）

### 对象相关

1. 深拷贝实现
2. 对象扁平化（如：{ a: { b: 1 } } => { 'a.b': 1 }）
3. 对象属性监听（实现类似 Vue 的响应式）
4. 对象属性路径获取（如：get(obj, 'a.b.c')）
5. 对象属性验证器

### Promise 相关

1. Promise 基础实现（手写 Promise 类）
2. Promise.all 实现
3. Promise.race 实现
4. Promise.retry 实现（失败重试）
5. Promise 超时控制
6. Promise 并发控制

### 工具函数

1. 类型判断（isArray, isObject 等）
2. 日期格式化
3. URL 参数解析
4. 颜色值转换（RGB/HEX/HSL 互转）
5. 文件大小格式化

## 如何添加新题目

1. 在 `src` 目录下创建对应的题目文件
2. 在 `test` 目录下创建对应的测试文件
3. 实现题目要求的功能
4. 编写测试用例
5. 运行测试确保通过
