const headConf = require('./config/headConf')
const pluginsConf =require('./config/pluginsConf')
const navConf = require('./config/navConf')
const sidebarConf = require('./config/sidebarConf')

module.exports = {
    base: '/vuepressBlog/',
    title: 'Willone',
    description: '玩命加载中',
    head: headConf,
    plugins: pluginsConf,
    theme:'reco', // 使用reco主题
    themeConfig: {
        logo: '/assets/img/logo.png',
        nav: navConf,
        sidebar: sidebarConf,
        lastUpdated: '上次更新',
        
        // reco 主题配置
        subSidebar: 'auto', // reco全局开启自动子侧边栏
        // 没有使用type: 'blog'，但是在移动端浏览器还是存在作者信息，需要加上图片。
        type: 'blog',
        authorAvatar: '/icons/icon-152x152.png'
    }
}