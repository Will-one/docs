const headConf = require('./config/headConf')
const pluginsConf =require('./config/pluginsConf')
const navConf = require('./config/navConf')
const sidebarConf = require('./config/sidebarConf')

module.exports = {
    base: '/vuepressBlog/',
    title: 'Willone',
    description: 'Just playing around',
    head: headConf,
    plugins: pluginsConf,
    themeConfig: {
        logo: '/assets/img/logo.png',
        nav: navConf,
        sidebar: sidebarConf,
        lastUpdated: '上次更新'
    }
}