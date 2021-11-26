module.exports = [
    { text: '首页', link: '/', icon: 'fas fa-home' },
    {
        text: '前端',
        icon: 'fas fa-laptop-code',
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
        text: '后端',
        icon: 'fas fa-server',
        items: [
            { text: 'Nodejs', link: '' },
            { text: 'Nginx', link: '' },
            { text: 'MongoDB', link: '' },
            { text: 'Redis', link: '' },
            { text: 'Express', link: '' }
        ]
    },
    {
        text: '建站',
        icon: 'fas fa-clone',
        link: '/buildguider/'
    },
    {
        text: '开发工具', 
        icon: 'fas fa-wrench',
        items: [
            { text: 'Git', link: 'https://git-scm.com/book/zh/v2' },
            { text: '兼容性查询', link: 'https://caniuse.com/?search=flex' },
            { text: 'API请求测试', link: 'https://httpbin.org/' },
            { text: 'MDN', link: 'https://developer.mozilla.org/zh-CN/' }
        ]
    },
    {
        text: '关于', 
        icon: 'fas fa-book',
        items: [
            { text: '关于本站', link: '/about/' },
            { text: '关于我', link: '' }
        ]
    }
]