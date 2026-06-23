# 我的 Hexo 博客

基于 [Hexo](https://hexo.io/zh-cn/) 构建的个人博客，部署到 GitHub Pages。

## 快速开始

### 1. 安装依赖

首先确保你已安装 [Node.js](https://nodejs.org/)（需要 20.19.0 或更高版本）和 [Git](https://git-scm.com/)。

```bash
npm install
```

### 2. 本地预览

```bash
npm run server
# 或
npx hexo server
```

浏览器打开 `http://localhost:4000` 即可预览。

### 3. 创建新文章

```bash
npm run new "文章标题"
# 或
npx hexo new "文章标题"
```

### 4. 生成静态文件

```bash
npm run build
# 或
npx hexo generate
```

### 5. 部署到 GitHub Pages

推送代码到 GitHub 仓库的 `main` 分支，GitHub Actions 会自动构建并部署。

**手动部署前请修改 `_config.yml` 中的 `url` 和 `deploy` 配置。**

## 项目结构

```
.
├── .github/workflows/  # GitHub Actions 自动部署
├── scaffolds/          # 文章模板
├── source/
│   ├── _drafts/        # 草稿
│   └── _posts/         # 已发布文章
├── themes/             # 主题（默认 landscape）
├── _config.yml         # 站点配置
├── package.json        # 依赖配置
└── .gitignore
```

## 常用命令

| 命令 | 说明 |
|------|------|
| `npm run server` | 启动本地服务器预览 |
| `npm run new "标题"` | 创建新文章 |
| `npm run build` | 生成静态文件到 public/ |
| `npm run clean` | 清除缓存和静态文件 |
| `npm run deploy` | 部署到远程服务器 |

## 参考

- [Hexo 官方文档](https://hexo.io/zh-cn/docs/)
- [Hexo 主题](https://hexo.io/themes/)
- [GitHub Pages 部署指南](https://hexo.io/zh-cn/docs/github-pages)
