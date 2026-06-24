---
title: Isekai Reincarnation Story-Based Personality Assessment
date: 2026-06-24
lang: en
permalink: en/2026/06/24/isekai-personality-assessment/
categories: Project
tags:
  - React
  - Next.js
  - Firebase
  - Personality Test
  - RPG
  - TypeScript
---

![Title Screen](/images/isekai/01-intro.png)

## 📄 Overview

**Isekai Reincarnation: The Savior's Legend Before Graduation** is an immersive story-driven personality assessment web app. Players make choices at 10 critical story junctures, and the system infers their personality traits from those decisions. The UI is designed with a Re:Zero-inspired dark fantasy RPG aesthetic.

🔗 Try it live: [firstplaye.github.io/isekai-shindan](https://firstplaye.github.io/isekai-shindan/)

---

## 🎯 Concept

Traditional personality tests are boring — a bunch of radio buttons and a cold, generic result.

This project wraps the test in an **"Isekai Reincarnation" RPG narrative**:

> Dizzy from your graduation thesis, you open your eyes to find yourself under a starry sky in a divine temple. A beautiful goddess smiles: "Soul from another world, the mission to save this realm has been entrusted to you."

As the story unfolds, the player chooses a class, takes on quests, rescues allies, and confronts the Demon King. Every choice reflects **personality — not right or wrong**.

---

## 🧬 5 Dimensions × 15 Job Classes

The system evaluates 5 personality dimensions and combines primary/secondary traits into **15 unique RPG job classes**:

| Dimension | Icon | Representative Class |
|------|:--:|------|
| Initiative | ⚔️ | Dual Blade Hero |
| Logic | 🧙 | Great Sage |
| Responsibility | 🛡️ | Holy Knight Commander |
| Curiosity | 🏹 | Frontier Hunter |
| Social Drive | 💬 | Bonds Bard |

When two dimensions score within 20% of each other, a hybrid class is triggered — such as "⚔️🛡️ Crimson Guardian" or "🧙💬 Diplomatic Sage".

---

## 🛠 Tech Stack

| Layer | Technology |
|------|------|
| Frontend | React 19 + Next.js 16 |
| Language | TypeScript |
| Styling | Tailwind CSS 4 |
| Animation | Framer Motion |
| Charts | Pure SVG pentagon radar chart |
| Database | Firebase Firestore |
| Deployment | GitHub Pages (static export) |

![Question Screen](/images/isekai/02-question.png)

---

## 🎨 UI Design

Dark fantasy style inspired by Re:Zero:

- Amber-gold ornate borders with double-line decoration
- RPG dialogue boxes (Narration label + blinking triangle cursor)
- HP bar-style progress indicator
- Rotating magic circles (triple ring + SVG gear patterns)
- Floating mana particle effects
- Chapter transition screen with black curtain + magic circle

![Result Screen](/images/isekai/03-result.png)

---

## 📊 Pentagon Radar Chart

Results display a pure SVG pentagon ability radar — no chart libraries needed:

- 4 concentric grid levels
- Gold semi-transparent data polygon, animated from center
- Colored vertex dots (MAIN / SUB / Normal)
- Auto-positioned labels that never clip

---

## 🔥 Firebase Integration

- Results auto-saved to Firestore
- Auto-incremented user IDs: `user0, user1, user2...`
- `runTransaction` for atomic counter operations
- Fire-and-forget: save failure never blocks result display

---

## 🚀 Deployment

Hosted on **GitHub Pages** via GitHub Actions CI/CD:

1. Push code → auto-trigger workflow
2. Next.js static export → `out/` directory
3. Deploy to GitHub Pages

Zero cost, fully automated.

---

## 📂 Project Structure

```
src/
├── app/
│   ├── page.tsx              # 3-phase state machine (intro→quiz→result)
│   ├── layout.tsx            # Root layout & SEO metadata
│   ├── globals.css           # Re:Zero theme styles
│   └── test/
│       └── page.tsx          # Firebase connection test page
├── lib/
│   ├── assessment-data.ts    # 10 story questions & scoring logic
│   ├── firebase.ts           # Firebase init & auto-increment counter
│   └── personality-types.ts  # 15 job class definitions
└── components/
    ├── IntroScreen.tsx        # Title screen + magic circle
    ├── QuestionCard.tsx       # VN-style dialogue box + choices
    ├── ChapterTransition.tsx  # Chapter transition animation
    ├── RadarChart.tsx         # Pentagon radar chart
    └── ResultPage.tsx         # Result display (job card + stats + oracle)
```

---

## 🔮 Roadmap

- [ ] Multi-language support (ja / zh / en)
- [ ] Shareable result card generation (OG Image)
- [ ] Public stats dashboard (class distribution)
- [ ] Additional story branches

---

> 💡 Source: [github.com/firstplaye/isekai-shindan](https://github.com/firstplaye/isekai-shindan)

---

## 📱 Scan to Try

![QR Code](/images/isekai/qr-code.png)
