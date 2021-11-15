const moment = require("moment")

module.exports = {
    base: '/vuepressBlog/',
    title: 'Willone',
    description: 'Just playing around',
    head: [
        ['meta', { name: 'author', content: 'Willone' }],
        ['meta', { name: 'keywords', content: 'vuepress,博客,前端' }],
        ['link', { rel: 'icon', href: '/favicon.ico' }],
    ],
    plugins: [
        [
            '@vuepress/last-updated',
            {
                transformer: (timestamp, lang) => {
                    moment.locale(lang)
                    return moment(timestamp).format('LLLL')
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