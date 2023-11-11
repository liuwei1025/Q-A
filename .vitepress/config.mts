import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: process.env.NODE_ENV === 'development' ? undefined : '/Q-A/',
  title: "Q-A",
  description: "A VitePress Site",
  themeConfig: {
    search: {
      provider: 'local'
    },
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '首页', link: '/' },
      { text: 'GPT问答', link: '/chatGPT/index' }
    ],

    sidebar: [
      {
        text: '指引',
        items: [
          { text: '2023.11.09', link: '/chatGPT/joycoderfe-2023_11_9' },
          { text: '2023.11.11', link: '/chatGPT/2023_11_11' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
})
