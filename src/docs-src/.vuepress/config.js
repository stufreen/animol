module.exports = {
  title: 'Animol',
  description: 'A minimal, super lightweight (<3KB minimized and gzipped), zero dependency, JavaScript animation library.',
  base: '/animol/',
  dest: 'docs',
  theme: 'craftdocs',
  themeConfig: {
    sidebar: [
      '/',
      '/documentation',
    ],
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Documentation', link: '/documentation' },
      { text: 'Github', link: 'https://www.github.com/stufreen/animol/' },
    ]
  },
  markdown: {
    anchor: { level: [2, 3] },
    config(md) {
      let markup = require('vuepress-theme-craftdocs/markup')
      md.use(markup)
    },
    lineNumbers: true,
  },
  port: 39081
}