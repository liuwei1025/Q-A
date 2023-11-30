# 工具泛型集合

## [官方工具集合](https://www.typescriptlang.org/docs/handbook/utility-types.html)

## 日常工作

### 实现选取class中非函数类型的属性

::: tip getter setter
如果是属性的get set方法的函数 则保留此属性
:::

```ts
type NonFunctionPropertyNames<T> = {
  [K in keyof T]: T[K] extends Function ? never : K;
}[keyof T];

type NonFunctionProperties<T> = Pick<T, NonFunctionPropertyNames<T>>;

class MyClass {
  property1: string;
  property2: number;
  method1(): void {}
  get property(): number { return this.property2; }
  set property(value: number) { this.property2 = value; }
}

type Result = NonFunctionProperties<MyClass>;
// Result 类型将只包含 property1, property2 和 property
```
