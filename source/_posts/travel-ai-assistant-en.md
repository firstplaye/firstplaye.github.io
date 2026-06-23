---
title: AI Travel Assistant — Gemini-Powered Travel Planning Web App
date: 2026-06-23
lang: en
permalink: en/2026/06/23/travel-ai-assistant/
categories: Project
tags:
  - Vue
  - Node.js
  - Express
  - Gemini
  - AI
  - SSE
  - Vant
---

## 📄 Overview

**AI Travel Assistant** is a **Japanese travel planning web app** powered by Google Gemini. Just enter your destination, budget, and number of days — AI generates a detailed itinerary automatically. Includes real-time streaming AI chat.

> 🌐 **Live Site:** [https://travel-app-02ok.onrender.com/](https://travel-app-02ok.onrender.com/)

---

## 🎯 Why I Built This

Planning a trip involves researching attractions, food, and accommodations — very time-consuming. Language barriers make it even harder for international travel.

So I built this app to use AI to **generate an ideal travel plan in seconds**.

---

## 🏗 Architecture

```mermaid
flowchart TB
    subgraph Frontend["🖥 Frontend (Vue3 + Vite)"]
        Home[Home]
        Chat[AI Chat]
        Planner[Itinerary]
        Profile[Profile]
    end

    subgraph Backend["⚙️ Backend (Express)"]
        API1["POST /api/travel/recommend"]
        API2["POST /api/travel/chat (SSE)"]
    end

    subgraph AI["🤖 AI Service"]
        Gemini["Google Gemini"]
    end

    Home -->|"City・Budget・Days"| API1
    Chat -->|"Streaming Chat"| API2
    API1 --> Gemini
    API2 --> Gemini
    Gemini -->|"Itinerary JSON"| API1
    Gemini -->|"Token Stream"| API2
    API1 --> Planner
    API2 --> Chat
```

![AI Travel Assistant Home](/images/travel-home.png)

> ▲ Simple input form. One-tap selection for popular destinations: Tokyo, Osaka, Kyoto, Sapporo.

---

### AI Chat

Real-time conversation with AI assistant via SSE — **token-by-token streaming display**.

![AI Travel Assistant Chat](/images/travel-chat.png)

> ▲ Suggested questions help newcomers get started easily.

---

### Travel Itinerary

Generated plans organized by **day & time slot (morning/afternoon/evening)**, with budget breakdown.

![AI Travel Assistant Planner](/images/travel-planner.png)

> ▲ Collapsible panels for clean viewing. Budget and tips at a glance.

---

## 🛠 Tech Stack

| Category | Technology |
|----------|-----------|
| **Frontend** | Vue 3, Vite, Vant 4 |
| **Backend** | Node.js, Express |
| **AI/LLM** | Google Gemini (`@google/genai` SDK) |
| **Streaming** | Server-Sent Events (SSE) |
| **Language** | Japanese UI |

---

## 🔍 Technical Highlights

### Real-time AI Chat via SSE

Unlike traditional API calls, SSE delivers AI-generated text **token by token in real-time**.

### Structured Prompts for Stable JSON

Sends Gemini a **strict JSON Schema** prompt to ensure consistent structured output.

### Mobile-First UI

Built with Vant 4 for smartphone-first design. Bottom tab bar, picker, collapsible panels — all **optimized for mobile users**.

---

> 🌐 **Live Site:** [https://travel-app-02ok.onrender.com/](https://travel-app-02ok.onrender.com/)
>
> Personal project. Source code coming soon.
