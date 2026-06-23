---
title: Graduation Project — Document Intelligence Analysis & Auto-Correction System
date: 2026-03-15
lang: en
permalink: en/2026/03/15/thesis-docx-system/
categories: Project
tags:
  - Python
  - LLM
  - DOCX
  - Automation
  - Graduation
---

## 📄 Overview

A system that **parses non-standard DOCX documents and automatically corrects them into formal format**. Built with Python for document structure analysis, multi-threading for speed, and LLM integration for text rewriting.

---

## 🎯 Background

Organizations produce massive documents daily, but inconsistent formatting, layout errors, and punctuation misuse are common. Manual correction is time-consuming.

This system aims to:

- **Auto-parse** document structure
- **Unify formatting**
- **Improve text quality** via LLM
- **Drastically reduce** work time

---

## 🏗 Architecture

![System Overview](/images/图片1.png)

> ▲ System architecture overview. Three-layer structure: Vue frontend → Flask backend → AI processing modules.

---

## 🔍 Key Features

### 1. Document Structure Analysis

Parses DOCX XML structure: text & paragraphs, heading levels (H1~H6), tables & lists, images & charts

![Document Before Correction](/images/图片2.png)

> ▲ Example document before correction. Left: original upload & analysis. Right: detected issues & correction options.

### 2. Auto-Correction (Multi-threaded)

Python threading for parallel tasks: symbol/spacing unification, punctuation conversion, heading identification, template insertion, duplicate detection

### 3. LLM Text Rewriting

LLM enhances document quality: naturalness & readability, proper terminology, style consistency, redundancy reduction

---

## 📊 Processing Flow

![Correction Steps](/images/图片4.png)

> ▲ Detailed correction steps: upload → structure analysis → AI correction → final output.

---

## 🛠 Tech Stack

| Tech | Purpose |
|------|---------|
| **Python 3.11** | Main language |
| **python-docx** | DOCX I/O |
| **lxml** | XML parsing |
| **threading** | Parallel processing |
| **OpenAI API** | LLM rewriting |

---

## 📈 Results

- **~80% reduction** in processing time vs manual
- **95%+** formatting consistency rate
- **20%** quality score improvement via LLM
- Supports batch processing

![After Correction](/images/图片3.png)

> ▲ Result after LLM correction. Original (left) vs AI-corrected (right).

---

> Graduation project for Digital Media Technology, Changsha University.
