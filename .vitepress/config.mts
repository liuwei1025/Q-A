import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: process.env.NODE_ENV === 'development' ? undefined : '/Q-A/',
  title: 'Q-A',
  description: 'A VitePress Site',
  themeConfig: {
    search: {
      provider: 'local',
    },
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '首页', link: '/' },
      { text: 'GPT问答', link: '/chatGPT/index' },
    ],

    sidebar: [
      {
        text: '指引',
        items: [
          {
            text: '2023.11',
            items: [
              { text: '函数式编程', link: '/chatGPT/joycoderfe-2023_11_9' },
              {
                text: 'Zustand',
                items: [
                  { text: '初识Zustand', link: '/chatGPT/2023_11_11' },
                  { text: 'zustand源码分析', link: '/zustand/source' },
                  { text: 'zustand最佳实践', link: '/zustand/practice' },
                ],
              },
              {
                text: 'storybook',
                items: [
                  {
                    text: 'addons',
                    link: '/storybook/addons',
                  },
                ],
              },
              {
                text: 'Typescript',
                items: [
                  {
                    text: '日常工具集合',
                    link: '/typescript/utils',
                  },
                ],
              },
            ],
          },
          {
            text: '2024.01',
            items: [
              {
                text: '问题分析模型',
                link: '/chatGPT/JoyCoderFE-Chat-2024_1_17.md'
              }
            ]
          },
          {
            text: '2024.08',
            items: [
              {
                text: 'monorepo中升级Vue版本',
                link: '/chatGPT/upgrade vue version.md'
              }
            ]
          }
        ],
      },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' },
    ],
  },
  markdown: {
    lineNumbers: true,
  },
  lastUpdated: true,
})
