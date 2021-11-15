const moment = require("moment")

module.exports = {
    base: '/vuepressBlog/',
    title: 'Willone',
    description: 'Just playing around',
    head: [
        ['meta', { name: 'author', content: 'Willone' }],
        ['meta', { name: 'keywords', content: 'vuepress,博客,前端' }],
        ['link', { rel: 'icon', href: '/favicon.ico' }],
        ['link', { rel: 'manifest', href: '/manifest.json' }],
        ['meta', { name: 'theme-color', content: '#3eaf7c' }],
        ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
        ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }],
        ['link', { rel: 'apple-touch-icon', href: '/icons/icon-152x152.png' }],
        // ['link', { rel: 'mask-icon', href: '/icons/safari-pinned-tab.svg', color: '#3eaf7c' }],
        ['meta', { name: 'msapplication-TileImage', content: '/icons/icon-144x144.png' }],
        ['meta', { name: 'msapplication-TileColor', content: '#000000' }]
    ],
    plugins: [
        [
            '@vuepress/last-updated', {
                transformer: (timestamp, lang) => {
                    moment.locale(lang)
                    return moment(timestamp).format('LLLL')
                }
            }
        ],
        [
            '@vuepress/pwa', {
                serviceWorker: true,
                // pwa新内容popup
                updatePopup: {
                    message: "新的内容可用",
                    buttonText: "刷新"
                }
            }
        ]
    ],
    themeConfig: {
        logo: '/assets/img/logo.png',
        nav: [
            {
                text: 'Languages',
                ariaLabel: 'Language Menu',
                items: [
                    { text: 'Chinese', link: '/language/chinese/' },
                    { text: 'Japanese', link: '/language/japanese/' }
                ]
            },
            { text: 'Home', link: '/' },
            { text: 'About', link: '/about/' },
            {
                text: '了解更多',
                items: [
                    {
                        text: 'Group1', items: [
                            { text: 'Group', link: '/group/' },
                            { text: 'About', link: '/about/' },
                        ]
                    },
                    {
                        text: 'Group2', items: [
                            { text: 'Chinese', link: '/language/chinese/' },
                            { text: 'Japanese', link: '/language/japanese/' }
                        ]
                    }
                ]
            },
            { text: 'External', link: 'https://google.com' },
        ],
        sidebar: {
            '/about/': [''],
            '/group/': [
                '',
                'item1',
                'item2'
            ]

        },
        lastUpdated: '上次更新'
    }
}