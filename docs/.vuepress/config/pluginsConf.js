const moment = require("moment")

module.exports = [
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
    ],
    ['@vuepress/back-to-top'],
    ['@vuepress/medium-zoom',{
        selector:'img.zoom-img'
    }]
]