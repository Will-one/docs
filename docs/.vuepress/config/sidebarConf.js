module.exports = {
    '/about/': [''],
    '/frontend/html/': [
        {
            title: 'HTML',
            collapsable: false,
            sidebarDepth: 2,
            children: [
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

    '/frontend/javascript/': [
        {
            title: 'JavaScript',
            collapsable: false,
            sidebarDepth: 2,
            children: [
                '',
                'typeConversion',
                'prototype',
                'executionContexts',
                'scope',
                'closure',
                'objectInherit',
                'threadEvent'
            ]
        }
    ],
    '/frontend/ajax/': [
        {
            title: 'AJAX',
            collapsable: false,
            sidebarDepth: 2,
            children: [
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