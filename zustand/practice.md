# zustand 最佳实践

## 使用 `atom` 简化 Zustand 状态管理

在 React 状态管理的世界中，Zustand 作为一个极简且灵活的库，提供了一种直接的方式来创建和管理组件外部的状态。然而，习惯了传统 `useState` 钩子的开发者可能会发现 Zustand 的使用方式有些不同。为了弥合这一差异并提供更熟悉的接口，我们引入了 `atom` 方法。

`atom` 方法是一个实用工具，旨在将 Zustand 的原始值状态转换成类似于 React `useState` 钩子的 `[state, setState]` 模式。这个方法对于那些偏好 `useState` 简洁直观语法，同时又想利用 Zustand 全局状态管理能力的开发者来说特别有用。

下面是 `atom` 方法的工作原理：

```typescript
/**
 * @example primitive value
 * export const useAddressErr = atom(false)
 * const [addressErr, setAddressError] = useAddressErr()
 *
 * @example object
 * export const useParams = atom({a:1,b:2})
 * const [a, setA] = useParams(state => state.a)
 */
export const atom = <T>(val: T) => {
  const store = create<T>()(() => val);
  const hooks = (selector = (state: T) => state) =>
    [store(selector), store.setState] as [
      ReturnType<typeof selector>,
      StoreApi<T>['setState'],
    ];
  hooks.reset = () => store.setState(val, true);
  hooks.store = store;
  return hooks;
};
```

`atom` 函数是一个泛型方法，它接受一个参数 `val`，这是状态的初始值，并且限制为数字、字符串或布尔值中的一种。这个约束确保了该方法只适用于最常见的 `useState` 钩子使用场景——原始值。

该方法首先检查提供值的类型，确保它是允许的原始类型之一。如果检查通过，它使用 Zustand 的 `create` 函数创建一个带有初始值 `val` 的新存储。然后，存储被用来返回一个元组，类似于 `useState`，包含当前状态和一个更新状态的设置函数。

如果提供的值不是原始类型，该方法会抛出一个 `type error`，表明 `atom` 方法只应该用于原始值。

要使用 `atom` 方法，你通常会从一个模块中导出它，然后在你的 React 组件中这样使用：

```typescript
export const useMyState = atom<string>('initialValue');

// 在 React 组件内部
const [myState, setMyState] = useMyState();
```

总结来说，`atom` 方法提供了一种无缝整合 Zustand 全局状态管理与熟悉的 `useState` 模式的方式。它是一个对于想要结合 `useState` 的简单性和 Zustand 全局状态强大功能的开发者来说非常实用的工具。无论你是 Zustand 的新手，还是想简化你的状态管理代码，`atom` 都是你 React 工具箱中的宝贵补充。

## Simplifying Zustand State Management with the `atom` Hook

In the world of React state management, Zustand has emerged as a minimalist and flexible library that offers a straightforward way to create and manage state outside of React components. However, developers coming from the traditional `useState` hook might find the transition to Zustand's approach a bit different. To bridge this gap and provide a more familiar interface, we introduce the `atom` method.

The `atom` method is a utility designed to transform a primitive Zustand store value into a React hook that mimics the `useState` hook's `[state, setState]` pattern. This method is particularly useful for developers who prefer the concise and intuitive `useState` syntax but want to leverage Zustand's global state management capabilities.

Here's a closer look at how the `atom` method works:

```typescript
const atom = <T extends number | string | boolean>(val: T) => {
  const typeVal = typeof val;
  if (['number', 'string', 'boolean'].includes(typeVal)) {
    const store = create<T>()(() => val);
    return () => [store((state) => state), store.setState];
  }
  throw new Error('type error');
};
```

The `atom` function is a generic method that takes a single argument `val`, which is the initial value of the state and is constrained to be either a number, string, or boolean. This constraint ensures that the method only works with primitive values, which are the most common use cases for the `useState` hook.

The method first checks the type of the provided value to ensure it's one of the allowed primitive types. If the check passes, it uses Zustand's `create` function to create a new store with the initial value `val`. The store is then used to return a tuple, similar to `useState`, containing the current state and a setter function to update the state.

If the provided value is not a primitive type, the method throws a `type error`, indicating that the `atom` method should only be used with primitive values.

To use the `atom` method, you would typically export it from a module and then use it within your React components like so:

```typescript
export const useMyState = atom<string>('initialValue');

// Inside a React component
const [myState, setMyState] = useMyState();
```

In summary, the `atom` method offers a seamless way to integrate Zustand's global state management with the familiar `useState` pattern. It's a handy tool for developers who want the best of both worlds: the simplicity of `useState` and the power of Zustand's global state. Whether you're new to Zustand or looking to simplify your state management code, `atom` is a valuable addition to your React toolkit.