import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  // 站点元数据，会被注入到所有页面的 HTML 中
  // 网站标题
  lang: "zh-CN",
  title: "老刘面试题",
  // 网站描述
  description: "面试题收集",
  base: "/interview-question/",
  // 指定源文件目录，默认是在根目录下
  srcDir: "./",
  // 显示最新更新时间
  lastUpdated: true,
  // 纯净url，去掉.html后缀
  cleanUrls: true,

  // 主题配置
  // @see https://vitepress.dev/reference/default-theme-config
  themeConfig: {
    // 首页顶部导航栏
    nav: [
      { text: "前端面试题", link: "/docs/", activeMatch: "/docs/" },
    ],
    // 每个页面右侧大纲标题
    outline: {
      label: "内容大纲",
    },
    // 全局搜索功能，使用浏览器的搜索功能
    search: {
      provider: "local",
      options: {
        locales: {
          root: {
            translations: {
              button: {
                buttonText: "搜索文档",
                buttonAriaLabel: "搜索文档",
              },
              modal: {
                noResultsText: "没有找到相关结果",
                resetButtonTitle: "重置搜索",
                footer: {
                  selectText: "选择",
                  navigateText: "导航到",
                },
              },
            },
          },
        },
      },
    },
    docFooter: {
      prev: "上一页",
      next: "下一页",
    },
    lastUpdated: {
      text: "最后更新于",
      formatOptions: {
        dateStyle: "short",
        timeStyle: "medium",
      },
    },

    // 在某个导航下的侧边栏配置
    sidebar: {
      "/docs/": [
        {
          items: [
            { text: "开发基础", link: "/docs/develop-basic" },
            { text: "前端工程化", link: "/docs/engineering" },
            { text: "js数据类型", link: "/docs/js-datatype" },
            { text: "js基础", link: "/docs/js-basic" },
            { text: "HTML相关", link: "/docs/html" },
            { text: "CSS相关", link: "/docs/css" },
            { text: "网络相关", link: "/docs/network" },
            { text: "浏览器相关", link: "/docs/browser" },
            { text: "Nodejs相关", link: "/docs/nodejs" },
            { text: "Vue相关", link: "/docs/vue" },
            { text: "Vue周边", link: "/docs/vue-peripheral" },
            { text: "TS相关", link: "/docs/ts" },
            { text: "React相关", link: "/docs/react" },
            { text: "手撕代码", link: "/docs/hand-written" },
          ],
        },
      ],
    },

    // 顶部导航栏右侧图标
    socialLinks: [{ icon: "github", link: "https://github.com/yun8711/interview-question.git" }],
  },
});
