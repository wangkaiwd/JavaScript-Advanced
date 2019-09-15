## `JavaScript`进阶
### `JavaScript`高级

* 函数全解

#### 手写源码系列

* [手写`eventHub`](https://github.com/wangkaiwd/JavaScript-Advanced/blob/master/principle/eventHub/readme.md)
* [手写深拷贝]()
* [手写`bind`](https://github.com/wangkaiwd/JavaScript-Advanced/blob/master/principle/bind/readme.md)


### 项目测试环境配置

需要安装的依赖：  
* `typescript`
* `ts-node`
* `mocha`
* `chai`
* `@types/mocha`,`@types/chai`

这里由于在原型上绑定了`myBind`方法，所以用到了自定义的`d.ts`文件，所以我们对`tsconfig.json`进行如下修改来支持`node_modules/@types`和自己的类型声明文件：  
```json
{
  "compilerOptions": {
    "target": "es5",
    "module": "commonjs",
    "strict": true,
    "typeRoots": [
      "./principle/types",
      "./node_modules/@types"
    ],
    "esModuleInterop": true
  },
  "exclude": [
    "node_modules",
    "principle/types"
  ]
}
```
配置过程参考这篇文章: [Adding Custom Type Definitions to a Third-Party Library](https://www.detroitlabs.com/blog/2018/02/28/adding-custom-type-definitions-to-a-third-party-library/)

安装好相应的依赖后需要对`mocha`进行配置使用

根目录下创建`mocha`的配置文件`.mocharc.json`：  
```json
{
  "extension": [
    "ts"
  ],
  "spec": "principle/**/*.spec.ts",
  "require": "ts-node/register"
}
```

然后`package.json`中的`script`中添加快捷命令：  
```json
{
  "scripts": {
    "test": "mocha"
  }
}
```

参考资料： 
* [mocha-example-typescript-application](https://github.com/mochajs/mocha-examples/blob/master/typescript/README.md)
* [mocha-command-line-usage](https://mochajs.org/#command-line-usage)
