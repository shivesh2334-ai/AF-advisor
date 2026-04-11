# AF Expert — Atrial Fibrillation Management Platform

> AI-powered clinical decision support for AF management based on **NICE NG196** (2021)

Built by **EMC Digitals / EasyMyCare** · Dr Shivesh Kumar

---

## Features

| Module | Description |
|---|---|
| 🤖 **AI AF Advisor** | Streaming Claude-powered expert cardiologist responses with NICE guideline citations |
| 🧠 **CHA₂DS₂-VASc Calculator** | Interactive stroke risk scoring with anticoagulation recommendations |
| 🩸 **ORBIT Bleeding Risk** | Bleeding risk stratification with modifiable factor checklist |
| 💊 **Rate / Rhythm Control** | Drug selection tool with HF filter, pill-in-the-pocket, and ablation guidance |
| ⚡ **Acute AF Pathway** | Decision tree for emergency, stable <48h, stable >48h, and HF + AF |
| 📋 **NICE Reference** | Accordion-style quick-access to all 11 guideline sections |

---

## Tech Stack

- **Next.js 14** (App Router)
- **Tailwind CSS**
- **Anthropic Claude API** (claude-opus-4-5, streaming)
- **Vercel** deployment (Mumbai `bom1` region)

---

## Deployment

### 1. Clone repository

```bash
git clone https://github.com/<your-username>/af-management.git
cd af-management
npm install
```

### 2. Set environment variables

```bash
cp .env.local.example .env.local
# Edit .env.local and add your ANTHROPIC_API_KEY
```

### 3. Run locally

```bash
npm run dev
# Open http://localhost:3000
```

### 4. Deploy to Vercel

**Option A — Vercel Dashboard (recommended for iPad workflow):**
1. Push to GitHub
2. Go to [vercel.com](https://vercel.com) → New Project → Import from GitHub
3. Add `ANTHROPIC_API_KEY` in Environment Variables
4. Deploy — region auto-set to Mumbai (`bom1`) via `vercel.json`

**Option B — Vercel CLI:**
```bash
vercel --prod
```

---

## Environment Variables

| Variable | Description |
|---|---|
| `ANTHROPIC_API_KEY` | Your Anthropic API key from console.anthropic.com |

---

## NICE Guideline Coverage

Covers all sections of NICE NG196:
- 1.1 Detection & Diagnosis
- 1.2 Stroke & Bleeding Risk Assessment
- 1.3 Cardiac Function Assessment
- 1.4 Personalised Package of Care
- 1.5 Referral
- 1.6 Stroke Prevention (DOACs, VKAs, LAAO)
- 1.7 Rate & Rhythm Control (drugs, cardioversion, ablation)
- 1.8 Acute AF Management
- 1.9 Stroke + AF Initial Management
- 1.10 Postoperative AF
- 1.11 Stopping Anticoagulation

---

## Disclaimer

This tool is for **clinical decision support only**. It does not replace clinical judgement, patient assessment, or full guideline review. Always refer to the complete NICE NG196 guideline for authoritative guidance.

---

*EasyMyCare · EMC Digitals · emcdigitals.com*
