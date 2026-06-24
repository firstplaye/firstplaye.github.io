---
title: 異世界転生ストーリー型性格診断アプリ
date: 2026-06-24
lang: ja
permalink: ja/2026/06/24/isekai-personality-assessment/
categories: プロジェクト
tags:
  - React
  - Next.js
  - Firebase
  - 性格診断
  - RPG
  - TypeScript
---

![タイトル画面](/images/isekai/01-intro.png)

## 📄 概要

**異世界転生——大学卒業直前の救世伝説** は、没入型ストーリー性格診断 Web アプリです。プレイヤーは 10 の重要な局面で選択を行い、その選択から性格特性が推論されます。UI は Re:Zero を彷彿とさせるダークファンタジー RPG 美学で設計されています。

🔗 体験はこちら：[firstplaye.github.io/isekai-shindan](https://firstplaye.github.io/isekai-shindan/)

---

## 🎯 コンセプト

従来の性格診断は退屈です——ラジオボタンが並び、冷たい結果が表示されるだけ。

本プロジェクトは診断を **「異世界転生」RPG の物語** に包み込みました：

> 卒論に追われるめまいと共に目を覚ますと——満天の星空の神殿。美しい女神が微笑む。「異世界の魂よ、世界を救う使命はあなたに託されました」

冒険の中で職業を選び、クエストを受け、仲間を救い、魔王と対峙する——すべての選択が **「正解」ではなく「性格」** を映し出します。

---

## 🧬 5 次元 × 15 職業

システムは 5 つの性格次元を評価し、メイン・サブ特性の組み合わせから **15 種類のユニークな RPG 職業** を導き出します：

| 次元 | アイコン | 代表職業 |
|------|:--:|------|
| 行動力 | ⚔️ | 双剣の勇者 |
| 論理的傾向 | 🧙 | 大賢者 |
| 責任感 | 🛡️ | 聖騎士団長 |
| 探求心 | 🏹 | フロンティアハンター |
| ソーシャル駆動 | 💬 | 絆の吟遊詩人 |

2 つの次元のスコア差が 20% 以内の場合、複合職業が発動——「⚔️🛡️ 紅蓮の守護者」「🧙💬 外交の賢者」など。

---

## 🛠 技術スタック

| 層 | 技術 |
|------|------|
| フロントエンド | React 19 + Next.js 16 |
| 言語 | TypeScript |
| スタイリング | Tailwind CSS 4 |
| アニメーション | Framer Motion |
| チャート | 純粋 SVG 五角形レーダーチャート |
| データベース | Firebase Firestore |
| デプロイ | GitHub Pages（静的書き出し） |

![質問画面](/images/isekai/02-question.png)

---

## 🎨 UI デザイン

Re:Zero に影響を受けたダークファンタジースタイル：

- 琥珀金の装飾枠 + 二重ボーダー
- RPG ダイアログボックス（Narration ラベル + 点滅三角カーソル）
- HP バー風プログレスバー
- 魔法陣回転アニメ（三重リング + SVG ギア模様）
- 浮遊マナ粒子エフェクト
- チャプター転換演出（暗幕 + 魔法陣）

![結果画面](/images/isekai/03-result.png)

---

## 📊 五角形レーダーチャート

結果ページでは純粋な SVG で五角形能力レーダーを描画——チャートライブラリ不要：

- 4 層の同心グリッド
- 金色半透明データポリゴン（中央からアニメーション出現）
- 頂点カラードット（MAIN / SUB / 通常）
- ラベル自動配置、長文クリップ無し

---

## 🔥 Firebase 連携

- 回答結果を Firestore に自動保存
- `user0, user1, user2...` 自動採番
- `runTransaction` でアトミックなカウンター操作
- 保存失敗は結果表示をブロックしない（fire-and-forget）

---

## 🚀 デプロイ

**GitHub Pages** にホスティング、GitHub Actions で CI/CD：

1. コードを Push → 自動でワークフロー起動
2. Next.js 静的書き出し → `out/` ディレクトリ
3. GitHub Pages にデプロイ

完全無料、完全自動。

---

## 📂 プロジェクト構造

```
src/
├── app/
│   ├── page.tsx              # 3 フェーズ状態遷移（intro→quiz→result）
│   ├── layout.tsx            # ルートレイアウト & SEO メタ
│   ├── globals.css           # Re:Zero テーマスタイル
│   └── test/
│       └── page.tsx          # Firebase 接続テストページ
├── lib/
│   ├── assessment-data.ts    # 10 問の設問データ & 採点ロジック
│   ├── firebase.ts           # Firebase 初期化 & 採番カウンター
│   └── personality-types.ts  # 15 職業の定義
└── components/
    ├── IntroScreen.tsx        # タイトル画面 + 魔法陣
    ├── QuestionCard.tsx       # VN 風ダイアログ + 選択肢
    ├── ChapterTransition.tsx  # チャプター転換アニメーション
    ├── RadarChart.tsx         # 五角形レーダーチャート
    └── ResultPage.tsx         # 結果表示（ジョブカード + ステータス + 託宣）
```

---

## 🔮 ロードマップ

- [ ] 多言語対応（ja / zh / en）
- [ ] 結果シェア画像生成（OG Image）
- [ ] 公開統計ダッシュボード（職業別分布）
- [ ] 追加シナリオ分岐

---

> 💡 ソースコード：[github.com/firstplaye/isekai-shindan](https://github.com/firstplaye/isekai-shindan)
