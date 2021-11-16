module.exports = [
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
]