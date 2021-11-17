module.exports = [
    { text: '首页', link: '/' },
    {
        text: '前端',
        items: [
            {
                text: '基础', items: [
                    { text: 'HTML', link: '/frontend/html/' },
                    { text: 'CSS', link: '/frontend/css/' },
                    { text: 'JavaScript', link: '/frontend/javascript/' },
                    { text: 'AJAX', link: '/frontend/ajax/' },
                ]
            },
            {
                text: '必备', items: [
                    { text: 'ES6', link: '/frontend/es6/' },
                    { text: 'Promise', link: '/frontend/promise/' },
                    { text: 'axios', link: '/frontend/axios/' }
                ]
            },
            {
                text: '框架', items: [
                    { text: 'Vue', link: '/frontend/Vue/' },
                ]
            }
        ]
    },
    {
        text: '开发工具', items: [
            { text: 'Git', link:'https://git-scm.com/book/zh/v2'},
            { text: '兼容性查询', link:'https://caniuse.com/?search=flex'},
            { text: 'API请求测试', link:'https://httpbin.org/'},
        ]
    },
    { text: '本站点', link: '/' },
    { text: '关于', link: '/about/' },
]