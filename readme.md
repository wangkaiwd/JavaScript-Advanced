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

### 测试相关优化

#### 运行指定的测试用例
当我们执行`yarn test`的时候会直接运行所有的测试用例，而有些时候我们只想运行某些测试用例。

如我们在手写`bind`方法时只想运行`bind`相关的测试用例，操作步骤如下：  
```shell script
yarn test -g 'myBind'
```

首先我们参考`stackoverflow`的答案： [how to run a single test with mocha](https://stackoverflow.com/questions/10832031/how-to-run-a-single-test-with-mocha)

从答案中我们看到了`--grep`的命令行操作，这里我们移步到`mocha`官方文档看一下该命令的作用：  
![](https://raw.githubusercontent.com/wangkaiwd/drawing-bed/master/mocha-test-filter.png)

官方支持了过滤测试的一些命令：  
* `--fgrep, -f`: 只运行包含指定字符串的测试用例
* `--grep, -g`: 只运行包含匹配的正则或字符串的用例
* `--invert, -i`: 只运行`--grep`和`--fgrep`没有包含或指定的测试用例

这里我们需要在`yarn` `scripts`命令后添加参数，`yarn`的官方文档中这样描述：  
![](https://raw.githubusercontent.com/wangkaiwd/drawing-bed/master/yarn-scripts-params.png)

由于`yarn`命令中的`run`可以省略不写，那么最终命令如下：  
```shell script
# 只运行包含'myBind'字符串的测试用例
yarn test -g 'myBind'
# 运行不包含'myBind'字符串的测试用例
yarn test -g 'myBind' -i
```
