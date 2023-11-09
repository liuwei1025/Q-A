import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: '/Q-A/',
  title: "Q-A",
  description: "A VitePress Site",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '首页', link: '/' },
      { text: 'GPT问答', link: '/chatGPT/index' }
    ],

    sidebar: [
      {
        text: '指引',
        items: [
          { text: '2023.11.09', link: '/chatGPT/joycoderfe-2023_11_9' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
})
