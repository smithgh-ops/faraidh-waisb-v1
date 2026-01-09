# 📚 SMART AI BRIEF - Kalkulator Waris Islam

**AI-Driven Development Workflow System**

> Sistem briefing lengkap yang memungkinkan AI apapun (ChatGPT, Claude, Gemini, Perplexity) untuk melanjutkan development project ini tanpa context loss.

---

## 🎯 **CURRENT STATUS**

| Metric | Value |
|--------|-------|
| **Progress** | **1.6%** (2/124 files) |
| **Phase** | Fase 0 - Foundation Setup |
| **Completed** | index.html, step-form.html |
| **Missing** | 122 files (JS, CSS, JSON, libs, assets) |
| **Next Task** | task-000: Folder setup + libraries (15 min) |
| **Last Updated** | 2026-01-06T23:03:41+07:00 |

---

## 📁 **FILE STRUCTURE**

### **🚀 START HERE**
- **`QUICKSTART_FIXED.md`** ← Read this first! (60-second onboarding)

### **📊 Core Briefing Files**
- **`STATUS_FIXED.json`** - Current project state (1.6%, blockers, metrics)
- **`TASKS_FIXED.json`** - Task queue with priorities & dependencies
- **`CHANGELOG_FIXED.md`** - Project history & decisions
- **`SUMMARY_FIXED.md`** - Human-readable overview

### **📖 Reference Documentation**
- **`PROJECT_BRIEF.md`** - Full project context (124 files, 5 mazhab, fiqih rules)
- **`AI_RULES.md`** - Working rules for AI (mandatory workflow)
- **`SCHEMAS.md`** - JSON data schemas & validation
- **`TEMPLATES.md`** - Format examples (changelog, commits, data files)
- **`ENVIRONMENT.json`** - Tech stack & constraints

### **🛠️ Utility Scripts**
- **`scripts/generate-summary.js`** - Auto-generate SUMMARY.md
- **`scripts/validate-data.js`** - Validate JSON files against schemas
- **`scripts/validate-task.js`** - Check task completion criteria

---

## ⚡ **QUICK START FOR AI**

### Step 1: Read Context (2 min)
```bash
1. Read QUICKSTART_FIXED.md  # 60-second overview
2. Read STATUS_FIXED.json    # Current state: 1.6%
3. Read TASKS_FIXED.json     # Find task-000 (first task)
```

### Step 2: Execute First Task (15 min)
```bash
task-000: Setup folders + download libraries
  - Create: css/, js/, data/, lib/, assets/, i18n/
  - Download: fraction.min.js, jspdf.min.js
  - Estimated: 15 minutes
```

### Step 3: Update Briefing (5 min)
```bash
1. Update STATUS_FIXED.json   → Progress 1.6% → X%
2. Update TASKS_FIXED.json    → Mark task-000 completed
3. Update CHANGELOG_FIXED.md  → Add entry
4. Regenerate SUMMARY_FIXED.md → New state
```

### Step 4: Commit & Handoff
```bash
git add .
git commit -m "feat(setup): Complete task-000 folder structure"
git push
```

**Total time for first task: ~20 minutes**

---

## 🎯 **PROJECT OVERVIEW**

### What We're Building
**Kalkulator Waris Islam** - Progressive Web App untuk menghitung pembagian warisan sesuai hukum Islam dengan dukungan **5 mazhab fiqih**.

### Key Features
- ✅ **5 Mazhab Support** (Jumhur, Hanafi, Maliki, Syafi'i, Hanbali)
- ✅ **Fraction-based Calculation** (No decimals! Uses Fraction.js)
- ✅ **Complete Dalil** (Quran + Hadith + Tafsir in Arabic/ID/EN)
- ✅ **Auto-detection** (Aul, Radd, Hijab cases)
- ✅ **PDF Export** (With dalil & detailed explanation)
- ✅ **Offline PWA** (< 5 MB total bundle)
- ✅ **Bilingual** (Indonesia + English)

### Tech Stack
- **Frontend:** Vanilla JavaScript (ES6+), HTML5, CSS3
- **Libraries:** Fraction.js (calculations), jsPDF (export)
- **Data:** 68 JSON files (heirs, dalil, education)
- **No Frameworks:** No React/Vue/Angular (keep it simple & small)
- **No Build Tools:** No webpack/vite (deploy directly)

---

## 📊 **CURRENT STATE**

### ✅ What EXISTS (2 files)
1. **index.html** (19.8 KB) - Landing page
   - Hero, features, stats, education accordion
   - Completeness: 70% (CSS inline, education partial)

2. **step-form.html** (49.8 KB) - Multi-step form
   - 6 steps (pewaris, marriage, parents, children, siblings, review)
   - Completeness: 75% (no calculation logic)

### ❌ What's MISSING (122 files)

**Critical P0 Blockers:**
- ❌ 14 JavaScript files (calculator-core.js, app.js, etc)
- ❌ 5 CSS files (currently all inline)
- ❌ 3 Libraries (fraction.js, jspdf.js, html2canvas.js)
- ❌ 68 Data JSON files (heirs, dalil, education)

**See SUMMARY_FIXED.md for full breakdown.**

---

## 📋 **TASK PRIORITY QUEUE**

### Phase 0: Foundation Setup (Target: 10%)

| Task ID | Priority | Effort | Description |
|---------|----------|--------|-------------|
| **task-000** | P0 | 15 min | Setup folders + download libs ⬅️ **START** |
| task-001 | P0 | 4-6 hrs | Extract CSS from HTML |
| task-002 | P0 | 3-4 days | Build calculator-core.js |
| task-003 | P0 | 1 day | Create app.js (form connector) |
| task-004 | P1 | 1 day | Create result.html page |
| task-005 | P1 | 6-8 hrs | Create 4 heir JSON files |
| task-006 | P1 | 4 hrs | Create 2 dalil Quran files |

**See TASKS_FIXED.json for full queue (8 tasks defined).**

---

## 🔄 **AI WORKFLOW RULES**

### Mandatory Process (From AI_RULES.md)

**At START of Session:**
1. Read STATUS_FIXED.json → Know current state
2. Read TASKS_FIXED.json → Pick highest priority open task
3. Confirm understanding of deliverables

**During Work:**
1. Follow acceptance criteria from task definition
2. Reference SCHEMAS.md for data formats
3. Use exact specs from ENVIRONMENT.json
4. Validate as you go

**At END of Session (MANDATORY):**
1. ✅ Update STATUS_FIXED.json (progress %, recently_completed)
2. ✅ Update TASKS_FIXED.json (mark completed, add timestamp)
3. ✅ Update CHANGELOG_FIXED.md (add entry)
4. ✅ Regenerate SUMMARY_FIXED.md (new state)

**If you don't update these 4 files, your work is INVALID!**

---

## 📏 **QUALITY STANDARDS**

### Code Quality
- ✅ JSDoc comments for all functions
- ✅ Error handling (try-catch for critical ops)
- ✅ No console.log in production
- ✅ Follows ENVIRONMENT.json coding standards

### Data Quality
- ✅ JSON validates against SCHEMAS.md
- ✅ All required fields present (ar/id/en)
- ✅ Dalil references exist
- ✅ File size within target ±20%

### Design Quality
- ✅ Uses CSS variables (no hardcoded colors)
- ✅ Mobile-first responsive
- ✅ Accessibility (ARIA labels, keyboard nav)
- ✅ Follows glassmorphic design system

---

## 🛠️ **VALIDATION TOOLS**

### Before Committing

```bash
# Validate JSON data files
node scripts/validate-data.js --file=data/heirs/primary/father.json

# Validate task completion
node scripts/validate-task.js --task=task-002

# Generate summary
node scripts/generate-summary.js
```

---

## 📖 **FOR HUMAN DEVELOPERS**

### First Time Setup
```bash
# 1. Clone repository
git clone <repo-url>
cd kalkulator-waris-islam

# 2. Read briefing
cat .ai/QUICKSTART_FIXED.md
cat .ai/SUMMARY_FIXED.md

# 3. Execute task-000 (if AI hasn't)
# Create folders + download libraries manually

# 4. Continue with task-001, task-002, etc
```

### Check Current Progress
```bash
# Quick status
cat .ai/STATUS_FIXED.json | grep "progress"

# Full summary
cat .ai/SUMMARY_FIXED.md

# Recent changes
cat .ai/CHANGELOG_FIXED.md | head -50
```

### Handoff to AI
```bash
# 1. Commit your work
git add .
git commit -m "feat: your changes"
git push

# 2. Update briefing files
# - STATUS_FIXED.json (increment progress)
# - TASKS_FIXED.json (mark tasks completed)
# - CHANGELOG_FIXED.md (add entry)
# - Regenerate SUMMARY_FIXED.md

# 3. AI will continue from updated state
```

---

## 🎓 **LEARNING RESOURCES**

### Fiqih Waris (For Development Context)
- Kitab references in `docs/kitab-references.md`
- Dalil sources in `data/dalil/quran/` & `data/dalil/hadith/`
- Educational content in `data/education/`

### Technical References
- Fraction.js docs: https://fraction.js.org/
- jsPDF docs: https://github.com/parallax/jsPDF
- PWA guide: https://web.dev/progressive-web-apps/

---

## 📞 **SUPPORT**

### Questions?
- Check `AI_RULES.md` for workflow questions
- Check `SCHEMAS.md` for data format questions
- Check `ENVIRONMENT.json` for tech stack questions
- Check `TEMPLATES.md` for format examples

### Found Issue?
1. Document in STATUS_FIXED.json → `inconsistencies_found`
2. If blocking: Add to `critical_blockers`
3. If needs human: Add to `questions_for_human`

---

## 📊 **METRICS**

### Current Stats
- **Total Files:** 124
- **Completed:** 2 (1.6%)
- **In Progress:** 0
- **Not Started:** 122
- **P0 Blockers:** 4
- **Phase:** 0 (Foundation Setup)
- **Target Completion:** March 2026

### Velocity Targets
- **Phase 0 (10%):** 2 weeks
- **Phase 1 (35%):** 4 weeks
- **Phase 2 (60%):** 6 weeks
- **Phase 3 (85%):** 8 weeks
- **Phase 4 (95%):** 9 weeks
- **Phase 5 (100%):** 10 weeks

---

## 🚀 **NEXT ACTIONS**

### For AI (Next Session)
1. ⚡ Execute task-000 (15 minutes)
2. 📝 Update STATUS_FIXED.json (progress → 2-3%)
3. ✅ Mark task-000 completed in TASKS_FIXED.json
4. 📄 Add CHANGELOG_FIXED.md entry
5. 📊 Regenerate SUMMARY_FIXED.md

### For Human (Review)
- ✅ Verify extracted CSS maintains visual consistency
- 🧪 Test calculator-core.js with sample cases
- 📚 Review dalil content for accuracy

---

## 📜 **LICENSE**

*To be determined - likely Open Source (MIT or GPL)*

---

## 🙏 **CREDITS**

**Project:** Kalkulator Waris Islam  
**Architecture:** AI-Driven Development Workflow  
**Briefing System:** Smart AI Brief v1.0  
**Last Updated:** 2026-01-06T23:03:41+07:00  
**Maintained By:** Human + AI Collaboration

---

**🚀 Ready to start? Read `QUICKSTART_FIXED.md` and execute task-000!**
