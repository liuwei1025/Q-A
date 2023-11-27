# Zustand源码分析

入口文件
```tsx
export * from './vanilla.ts'
export * from './react.ts'
export { default } from './react.ts'
```

## vanilla.ts
::: tip 提示
1. 移除了所有的类型
2. 移除了deprecated
:::
```ts
const createStoreImpl: CreateStoreImpl = (createState) => {
  // type TState = ReturnType<typeof createState>
  // type Listener = (state: TState, prevState: TState) => void
  let state: TState
  const listeners: Set<Listener> = new Set()

  const setState: StoreApi<TState>['setState'] = (partial, replace) => {
    // TODO: Remove type assertion once https://github.com/microsoft/TypeScript/issues/37663 is resolved
    // https://github.com/microsoft/TypeScript/issues/37663#issuecomment-759728342
    const nextState =
      typeof partial === 'function'
        ? (partial as (state: TState) => TState)(state)
        : partial
    if (!Object.is(nextState, state)) {
      const previousState = state
      state =
        // 针对primitive value做了优化 replace一般场景都是不传递的 所以如果是primitive value就直接替换
        replace ?? typeof nextState !== 'object'
          ? (nextState as TState)
          : Object.assign({}, state, nextState)
      listeners.forEach((listener) => listener(state, previousState))
    }
  }

  const getState: StoreApi<TState>['getState'] = () => state

  const subscribe: StoreApi<TState>['subscribe'] = (listener) => {
    listeners.add(listener)
    // Unsubscribe
    return () => listeners.delete(listener)
  }

  const api = { setState, getState, subscribe }
  state = createState(setState, getState, api)
  return api as any
}

export const createStore = ((createState) =>
  createState ? createStoreImpl(createState) : createStoreImpl) as CreateStore
```

可以看到如果移除了注释和外层包装方法之后，只有`30`行代码，而实现逻辑是一个发布订阅，而且订阅需要自己`subscribe`，而不是在get阶段就自动订阅

### 使用示例

```ts
const store = createStore(() => ({ bears: 0, fish: 0 })) // 此时对于应用来说创建了state,listeners的两个闭包和一个store变量
// getter 从源码中可以看出 无任何副作用
const state = store.getState()
// setter 1 注意setState的形参命名 partial -> 部分的
store.setState({bears: 1})
// setter 2 可以根据当前的state做判断后再返回新的state
store.setState(state => ({bears: 1}))

// 手动订阅
store.subscribe(console.log)
```

可以看到除了`@deprecated`外只有这3个API，而且`subscribe`的粒度很大，只能对store整体订阅，也就是store的某个字段变化的时候，所有的的监听都会变化一次需要引入`selector`的概念

## selector
::: tip zustand的selector是作用中间件提供出去的
`import { subscribeWithSelector } from 'zustand/middleware';`
:::

```ts
const subscribeWithSelectorImpl: SubscribeWithSelectorImpl =
  (fn) => (set, get, api) => {
    type S = ReturnType<typeof fn>
    type Listener = (state: S, previousState: S) => void
    const origSubscribe = api.subscribe as (listener: Listener) => () => void
    // 重写了subscribe方法
    api.subscribe = ((selector: any, optListener: any, options: any) => {
      let listener: Listener = selector // if no selector
      if (optListener) {
        const equalityFn = options?.equalityFn || Object.is
        let currentSlice = selector(api.getState())
        listener = (state) => {
          const nextSlice = selector(state)
          if (!equalityFn(currentSlice, nextSlice)) {
            const previousSlice = currentSlice
            optListener((currentSlice = nextSlice), previousSlice)
          }
        }
        if (options?.fireImmediately) {
          optListener(currentSlice, currentSlice)
        }
      }
      return origSubscribe(listener)
    }) as any
    const initialState = fn(set, get, api)
    return initialState
  }
export const subscribeWithSelector =
  subscribeWithSelectorImpl as unknown as SubscribeWithSelector
```

## react.ts
