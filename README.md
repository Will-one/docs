# docs
vuepress Blog


## P4 侧边栏
### 仅仅包含当前页面标题的侧边栏
```
---
sidebar: auto
---
```
```
// .vuepress/config.js
// 全局开启很少用
module.exports = {
  themeConfig: {
    sidebar: 'auto'
  }
}
```

### 多个侧边栏
为不同的页面组，显示不同的侧边栏，使用对象形式
匹配路径短的放在后面
```
// .vuepress/config.js
module.exports = {
  themeConfig: {
    sidebar: {
      '/group/': [
        '',
        'item1',
        'item2'
      ],

      // fallback
      '/': [
        '',        /* 主页 */
      ]
    }
  }
}
```

### 侧边栏分组
所有页面都会开启，即使本页面没有配置进去，也显示其他配置过的页面的侧边栏
```
// .vuepress/config.js
module.exports = {
  themeConfig: {
    sidebar: [
      {
        title: 'Group 1',   // 必要的
        path: '/foo/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
        collapsable: false, // 可选的, 默认值是 true,
        sidebarDepth: 1,    // 可选的, 默认值是 1
        children: [
          '/'
        ]
      },
      {
        title: 'Group 2',
        children: [ /* ... */ ],
        initialOpenGroupIndex: -1 // 可选的, 默认值是 0
      }
    ]
  }
}
```

