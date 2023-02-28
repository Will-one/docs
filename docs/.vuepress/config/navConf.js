module.exports = [
  { text: "首页", link: "/", icon: "fas fa-home" },
  {
    text: "前端",
    icon: "fab fa-css3",
    items: [
      {
        text: "基础",
        items: [
          { text: "HTML", link: "/frontend/html/" },
          { text: "CSS", link: "/frontend/css/" },
          { text: "JavaScript", link: "/frontend/javascript/" },
          { text: "AJAX", link: "/frontend/ajax/" },
          { text: "jQuery", link: "/frontend/jquery/" },
        ],
      },
      {
        text: "扩展",
        items: [
          { text: "ES6", link: "/frontend/es6/" },
          { text: "Promise", link: "/frontend/promise/" },
          { text: "axios", link: "/frontend/axios/" },
          { text: "webpack",link: "/frontend/webpack/"},
          { text: "可视化", link: "/frontend/visualization/" },
        ],
      },
      {
        text: "框架",
        items: [{ text: "Vue", link: "/frontend/Vue/" }],
      },
    ],
  },
  {
    text: "后端",
    icon: "fas fa-server",
    items: [
      {
        text: "技术栈",
        items: [
          { text: "Nodejs", link: "/backend/nodejs/" },
          { text: "Nginx", link: "/backend/nginx/" },
          { text: "SQL", link: "/backend/sql/" },
          { text: "MongoDB", link: "/backend/mongodb/" },
          { text: "Redis", link: "/backend/redis/" },
          { text: "JAVA", link: "/backend/java/" }
        ]
      },
      {
        text: "框架",
        items: [
          { text: "Express", link: "/backend/express/" },
        ]
      }
    ],
  },
  {
    text: "命令行",
    icon: "fas fa-laptop-code",
    items: [
      { text: "Git", link: "/command/git/" },
      { text: "Linux", link: "/command/linux/" },
      { text: "DOS", link: "/command/dos/" },
    ],
  },
  { text: "算法", icon: "fas fa-percentage", link: "/algorithms/" },
  {
    text: "开发工具",
    icon: "fas fa-wrench",
    items: [
      { text: "VScode", link: "/tools/vscode/" },
      { text: "Xcode", link: "/tools/xcode/" },
      { text: "Postman", link: "/tools/postman/" },
    ],
  },
  {
    text: "项目",
    icon: "fas fa-project-diagram",
    items: [
      { text: "项目1", link: "" },
      { text: "项目2", link: "" },
    ],
  },
  {
    text: "实用网站",
    icon: "fab fa-internet-explorer",
    items: [
      { text: "兼容性查询", link: "https://caniuse.com/?search=flex" },
      { text: "API请求测试", link: "https://httpbin.org/" },
      { text: "MDN", link: "https://developer.mozilla.org/zh-CN/" },
      { text: "ECharts", link: "https://echarts.apache.org/en/index.html" },
      {
        text: "Font Awesome",
        link: "https://fontawesome.com/v5.15/icons?d=gallery&p=2&m=free",
      },
      { text: "Lodash", link: "https://www.lodashjs.com/" },
      { text: "MonkeyTyoe", link: "https://monkeytype.com/" },
    ],
  },
  { text: "关于", link: "/about/", icon: "fas fa-book" },
];
