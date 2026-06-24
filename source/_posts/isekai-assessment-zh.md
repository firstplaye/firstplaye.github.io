---
title: 異世界転生ストーリー型性格診断アプリ
date: 2026-06-24
lang: zh-cn
permalink: zh-cn/2026/06/24/isekai-personality-assessment/
categories: 项目
tags:
  - React
  - Next.js
  - Firebase
  - 性格診断
  - RPG
  - TypeScript
---

## 📄 概述

**異世界転生——大学卒業直前の救世伝説** 是一款沉浸式剧情性格测试 Web 应用。玩家通过 10 个关键节点的选择，系统根据选择推断人格特征。设计风格参考 Re:Zero 的暗黑奇幻 RPG 美学。

🔗 在线体验：[firstplaye.github.io/isekai-shindan](https://firstplaye.github.io/isekai-shindan/)

---

## 🎯 设计理念

传统性格测试枯燥乏味——一堆选择题加一个冷冰冰的结果。

本项目把测试包装成**「異世界転生」RPG 剧情**：

> 毕业论文压得你头晕目眩——睁眼一看，满天繁星，女神微笑：「异世界的灵魂啊，拯救世界的使命就交给你了。」

玩家在冒险中选择职业、接任务、救同伴、面对魔王……每个选择都不是「对/错」，而是**性格的自然流露**。

---

## 🧬 5 维度 × 15 种职业

系统从 5 个维度评估性格，并根据主副特质组合出 **15 种独一无二的 RPG 职业**：

| 维度 | 图标 | 代表职业 |
|------|:--:|------|
| 行動力 | ⚔️ | 双剣の勇者 |
| 論理的傾向 | 🧙 | 大賢者 |
| 責任感 | 🛡️ | 聖騎士団長 |
| 探求心 | 🏹 | フロンティアハンター |
| ソーシャル駆動 | 💬 | 絆の吟遊詩人 |

当两个维度得分接近时（差距 < 20%），触发混合职业——如「⚔️🛡️ 紅蓮の守護者」「🧙💬 外交の賢者」等。

---

## 🛠 技术栈

| 层 | 技术 |
|------|------|
| 前端框架 | React 19 + Next.js 16 |
| 语言 | TypeScript |
| 样式 | Tailwind CSS 4 |
| 动画 | Framer Motion |
| 图表 | SVG 手绘五角形雷达图 |
| 数据 | Firebase Firestore |
| 部署 | GitHub Pages（静态导出） |

---

## 🎨 UI 设计

整体采用 **Re:Zero 暗黑奇幻风格**：

- 琥珀金边框 + 双层装饰线
- RPG 对话框（Narration 标签 + 闪烁三角光标）
- HP 血条式进度条
- 魔法阵旋转动画（三重环 + SVG 齿轮纹样）
- 浮动マナ粒子特效
- 章节转场黑幕 + 魔法阵过渡

---

## 📊 六边形雷达图

结果页用纯 SVG 绘制五角形能力雷达图，无需任何图表库：

- 4 层同心刻度网格
- 金色半透明数据多边形，动画从中心弹出
- 顶点彩色圆点（MAIN / SUB / 普通三档）
- 自动标签定位，长文字不裁切

---

## 🔥 Firebase 集成

- 答题结果自动保存到 Firestore
- `user0, user1, user2...` 自动递增编号
- 使用 `runTransaction` 保证并发安全
- 保存失败不影响结果展示（fire-and-forget）

---

## 🚀 部署

项目托管在 **GitHub Pages**，通过 GitHub Actions 自动构建部署：

1. Push 代码 → 自动触发 workflow
2. Next.js 静态导出 → `out/` 目录
3. 部署到 GitHub Pages

全程零成本。

---

## 📂 项目结构

```
src/
├── app/
│   ├── page.tsx              # 三阶段状态机（intro→quiz→result）
│   ├── layout.tsx            # 根布局 & SEO meta
│   ├── globals.css           # Re:Zero 主题样式
│   └── test/
│       └── page.tsx          # Firebase 连接测试页
├── lib/
│   ├── assessment-data.ts    # 10 道剧情题目 & 评分逻辑
│   ├── firebase.ts           # Firebase 初始化 & 计数器
│   └── personality-types.ts  # 15 种职业定义
└── components/
    ├── IntroScreen.tsx        # 标题画面 + 魔法阵
    ├── QuestionCard.tsx       # VN 风对话框 + 选项
    ├── ChapterTransition.tsx  # 章节转场动画
    ├── RadarChart.tsx         # 五角形雷达图
    └── ResultPage.tsx         # 结果展示（职业卡 + 状态 + アドバイス）
```

---

## 🔮 未来计划

- [ ] 添加日语 / 英语多语言
- [ ] 结果分享图生成（OG Image）
- [ ] 统计数据面板（各职业人数分布）
- [ ] 更多剧情分支

---

> 💡 源码：[github.com/firstplaye/isekai-shindan](https://github.com/firstplaye/isekai-shindan)
