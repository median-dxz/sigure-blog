---
title: Blog RoadMap
published: 2025-08-16
description: ""
image: ""
tags: []
category: ""
draft: false
lang: ""
---

这是一份详尽的 TODO，描述了这个 Blog 距离正式发布还需要肝干的事情（目前能想到的所有）：

- [ ] preitter 的配置有问题，会 lint markdown 内的代码块，也许这不算一个问题，但是会影响示例文档中的代码块，至少应该看看有没有选择性退出的办法。
- [ ] vsc markdown 的格式化（也由Preitter提供）貌似不会自动给单词前后**中文加空格**，而且我装了markdownlint MarkdownAll-in-One preitter 三个插件，感觉完全没必要...总之解决一个中文加空格的办法。而且我记得 preitter 有 markdown 插件的。
- [ ] 模板分支应该不需要 cSpell 插件的配置
- [ ] expressiveCode 的配置仍然需要进一步探究
- [ ] expressiveCode 的主题选取，包含亮暗，并且配置逻辑也需要改一改，我觉得同时配置config.ts和astro.config.mjs是合理的，如果要移动到一个文件里，那就做彻底一点。
- [ ] [这篇](https://fuwari.vercel.app/posts/markdown/) 示例中的 Footnotes 显示异常
- [ ] navbar 的滚动行为仍然需要打磨
- [ ] 启用并尝试 MDX 集成
- [ ] 使用 `<slot>` 对 Navbar 的几个 Icon 做服务端渲染，虽然目前理论上已经是服务端渲染了，但是不知道什么毛病必须要水合了才能显示
- [ ] latex 设置，现在用的貌似是 katex 这个库，别的先不说，长公式的左右滚动条失效了。
- [ ] css prune，魔改了一大波，总感觉有些类完全没用到。
- [ ] 全局滚动条定制，参考 SEA-H5 Launcher 里面的，原生定制 CSS 就够。
- [ ] Logo 重绘制（2.0！），用 inkspace 绘制为 SVG，有黑/白/彩三个变体，用作 favicon，自己用 imagemask 转出格式放在`public\`下面，`public\`下面应该始终放不需要进一步处理的原样素材，区别下面一条。
- [ ] 研究一下图片的打包构建流程，能用sharp转webp压缩的尽量转一下。css js html我相信astro和vite已经处理的很好了
- [ ] 重新选取要轮换的背景图片，压缩后总大小应该不超过 2MB，并且都有完整的原作链接和作者信息。
- [ ] 添加背景图片的Credit组件，这个也是Fuwari原来有的。
- [ ] 新fav换掉主页的小房子图标
- [ ] 参考 <https://www.krage-music.com/> 做首页文字动效，再不济可以用放白字，再说。
- [ ] TOC功能现在是完全broken状态，需要尽快修复。
- [ ] About编写，目前还没构思好，但是应该要写很多。
- [ ] 还没想好具体怎么弄，但是想搞一个定制的追番存档功能，按时间线记录看过的番/剧/电影，链接到观后感和官网/评分页，时间线上直接就能在卡片里看到剧照，发行时间，主演，（个人/bangumi/豆瓣）评分之类。
- [ ] swup的a11y插件警告，astro的开发工具audix文件，chrome开发者工具的issue，总之a11y相关。
- [ ] 图标渐变动画，看看有没有必要，我感觉没必要。
- [ ] pagefind配置，虽然它说这是0配置的...
- [ ] 对接一个评论系统
- [ ] fuwari这里的clickaway写的太...说好听点叫朴实无华，需要重构。
- [ ] 页脚添加更多信息，比如一些icon bounce动画，最后更新日期，还有站点用到的主要堆栈：
  - [ ] astro，vercel，主题（主题源）
- [ ] 对接一个好用的cms系统
- [ ] 刚发现的，这个github风格的Checkbox样式不太好看，点和选择框好像没对齐，spacing也不对
- [ ] 小小更新一下模板分支下的主题文档和readme

暂时就想到这么多？

---
灵感参考

https://fuwari.vercel.app/archive/
      
https://yukina-blog.vercel.app/posts/4e92433e
