module.exports = {
    '/about/': [''],
    '/frontend/html/': [
        {
            title: 'HTML',
            collapsable: false,
            sidebarDepth: 2,
            chileren: [
                '',
                'html_base'
            ]
        }
    ],
    '/frontend/css/': [
        {
            title: 'CSS',
            collapsable: false,
            sidebarDepth: 2,
            children: [
                '',
                'selector',
                'units',
                'boxModel',
                'float',
                'position',
                'fontText',
                'background',
                'flex'
            ]
        },
    ],

    '/frontend/javascript/': [''],
    '/frontend/ajax/': [
        {
            title: 'AJAX',
            collapsable: false,
            sidebarDepth: 2,
            chileren: [
                '',
                'ajax_base'
            ] 
        }
    ],
    '/frontend/es6/': [''],
    '/frontend/promise/': [''],
    '/frontend/axios/': [''],
    '/frontend/vue/': [''],
}