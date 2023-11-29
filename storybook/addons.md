# Addons

## 自动生成这个interface字段对应的storybook配置项
给定一个ts的interface IA  这个interface是组件A的props 自动生成这个interface字段对应的storybook配置项，这个功能如何实现


要为TypeScript接口`IA`自动生成对应的Storybook配置项，你可以使用`@storybook/addon-docs`中的`ArgsTable`组件，它可以自动地根据你的组件props生成文档和表格。但是，如果你想要自动生成控件（controls），你需要使用`@storybook/addon-controls`，它可以根据组件的props自动提供交互式的UI。

这里是一个基本的步骤指南：

1. 确保你已经安装了`@storybook/addon-docs`和`@storybook/addon-controls`。

2. 在你的`.storybook/main.js`配置文件中，添加这些插件到`addons`数组中。

```javascript
module.exports = {
  // ...
  addons: [
    '@storybook/addon-controls',
    '@storybook/addon-docs',
    // 其他插件...
  ],
};
```

3. 在你的Storybook stories文件中，为你的组件A编写一个story。确保你的组件A的props类型是`IA`。

```typescript
import React from 'react';
import { Story, Meta } from '@storybook/react';
import A from './A';
import { IA } from './IA';

export default {
  title: 'Example/ComponentA',
  component: A,
  argTypes: {
    // Storybook会自动根据IA接口生成控件
  },
} as Meta;

const Template: Story<IA> = (args) => <A {...args} />;

export const Default = Template.bind({});
Default.args = {
  // 设置默认的props
};
```

4. Storybook会自动根据`IA`接口中的字段和类型生成控件（controls），并且在`ArgsTable`中显示相应的文档。

如果你需要更细致地控制每个属性的行为，你可以在`argTypes`中手动指定它们，例如：

```typescript
argTypes: {
  someProperty: {
    control: 'text',
    description: '描述',
    defaultValue: '默认值',
  },
  // 其他属性...
},
```

这样，你就可以为你的组件A的props自动生成Storybook配置项。如果你的组件props非常复杂，或者你想要实现更自动化的解决方案，你可能需要编写自定义的脚本或使用第三方工具来解析TypeScript接口并生成相应的配置。