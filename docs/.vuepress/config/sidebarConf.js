module.exports = {
  // 前端
  // #region
  "/frontend/html/": [
    {
      title: "HTML",
      collapsable: false,
      sidebarDepth: 2,
      children: ["", "html_base", "label", "multimedia", "tableAndForm"],
    },
  ],
  "/frontend/css/": [
    {
      title: "CSS",
      collapsable: false,
      sidebarDepth: 2,
      children: [
        "",
        "selector",
        "units",
        "boxModel",
        "float",
        "position",
        "fontText",
        "background",
        "table",
        "transitionAndAnimation",
        "less",
        "flex",
        "mobile",
        "notes",
      ],
    },
  ],
  "/frontend/javascript/": [
    {
      title: "JavaScript",
      collapsable: false,
      sidebarDepth: 2,
      children: [
        "",
        "typeConversion",
        "prototype",
        "objectAndFunction",
        "executionContexts",
        "scope",
        "closure",
        "objectInherit",
        "threadEvent",
      ],
    },
  ],
  "/frontend/ajax/": [
    {
      title: "AJAX",
      collapsable: false,
      sidebarDepth: 2,
      children: ["", "ajax_base", "instruct", "cors"],
    },
  ],
  "/frontend/jquery/": [
    {
      title: "jQuery",
      collapsable: false,
      sidebarDepth: 2,
      children: ["", "jquery_base"],
    },
  ],
  "/frontend/es6/": [
    {
      title: "ES6",
      collapsable: false,
      sidebarDepth: 2,
      children: [
        "",
        "let",
        "destructuring",
        "number",
        "string",
        "object",
        "function",
        "array",
        "operator",
        "symbol",
        "iterator",
        "generator",
        "promise",
        "set-map",
        "class",
        "module",
        "async",
        "regex",
      ],
    },
  ],
  "/frontend/promise/": [
    {
      title: "Promise",
      collapsable: false,
      sidebarDepth: 2,
      children: [
        "",
        "promise-base",
        "property",
        "key-issue",
        "async-await",
        "promise-rewrite",
      ],
    },
  ],
  "/frontend/axios/": [
    {
      title: "axios",
      collapsable: false,
      sidebarDepth: 2,
      children: ["", "axios-base", "config", "axios-object", "interceptors"],
    },
  ],
  "/frontend/vue/": [
    {
      title: "Vue",
      collapsable: false,
      sidebarDepth: 2,
      children: ["", "notes"],
    },
  ],
  "/frontend/visualization/": [
    {
      title: "可视化",
      collapsable: false,
      sidebarDepth: 2,
      children: ["", "canvas", "svg"],
    },
  ],
  // #endregion

  // 后端
  // #region
  "/backend/nodejs/":[
    {
      title: "Node.js",
      collapsable: false,
      sidebarDepth: 2,
      children: [
        "", 
        "fs-module", 
        "path-module", 
        "http-module", 
        "modularization",
        "npm&package"
      ],
    }
  ],
  "/backend/express/":[
    {
      title: "Express",
      collapsable: false,
      sidebarDepth: 2,
      children: [
        "", 
        "base", 
        "middleware",
        "express-cors"
      ],
    }
  ],
  "/backend/mongodb/":[
    {
      title: "MongoDB",
      collapsable: false,
      sidebarDepth: 2,
      children: [
        "",
      ],
    }
  ],
  // #endregion

  // 算法
  // #region
  "/algorithms/": [
    {
      title: "算法",
      collapsable: false,
      sidebarDepth: 2,
      children: [""],
    },
  ],
  // #endregion

  // 关于
  // #region
  "/about/": [
    {
      title: "关于",
      collapsable: false,
      sidebarDepth: 2,
      children: ["", "about-me"],
    },
  ],
  // #endregion
};
