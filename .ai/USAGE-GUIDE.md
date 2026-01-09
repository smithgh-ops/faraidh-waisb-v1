# 🎓 PANDUAN PENGGUNAAN - Smart AI Brief System

**Last Updated:** 2026-01-06T23:12:40+07:00

---

## 📚 DAFTAR ISI

1. Untuk Human Developer
2. Untuk AI Agent  
3. **4 Simulasi Skenario:**
   - Skenario 1: AI Mulai Pertama Kali ⭐
   - Skenario 2: AI Melanjutkan Task
   - Skenario 3: Human Mengambil Alih  
   - Skenario 4: Multiple AI Sessions
4. Best Practices
5. Troubleshooting

---

# 📖 CARA MENGGUNAKAN SMART AI BRIEF SYSTEM

## 🎯 Overview Sistem

Smart AI Brief adalah **sistem briefing lengkap** yang memungkinkan:
- ✅ AI apapun (ChatGPT, Claude, Gemini, Perplexity) bisa langsung mulai work
- ✅ Zero context loss saat handoff Human ↔ AI
- ✅ Multiple AI sessions bisa bekerja secara bergantian
- ✅ Progress tracking real-time yang akurat
- ✅ Dependency management otomatis

### File Utama (6 files):
1. **QUICKSTART.md** - AI onboarding 60 detik
2. **STATUS.json** - Current state (progress, blockers, metrics)
3. **TASKS.json** - Task queue dengan priorities & dependencies
4. **CHANGELOG.md** - Project history & decisions
5. **SUMMARY.md** - Human-readable overview
6. **README.md** - Main entry point

---

# 👨‍💻 UNTUK HUMAN DEVELOPER

## Step 1: Setup Awal (5 menit)

```bash
# 1. Buat folder .ai di root project
mkdir .ai

# 2. Copy 6 file briefing yang sudah di-fix:
#    - STATUS_FIXED.json → .ai/STATUS.json
#    - CHANGELOG_FIXED.md → .ai/CHANGELOG.md
#    - TASKS_FIXED.json → .ai/TASKS.json
#    - QUICKSTART_FIXED.md → .ai/QUICKSTART.md
#    - SUMMARY_FIXED.md → .ai/SUMMARY.md
#    - README-BRIEFING_FIXED.md → .ai/README.md

# 3. Copy file referensi (dari briefing awal):
#    - PROJECT_BRIEF.md
#    - AI_RULES.md
#    - SCHEMAS.md
#    - TEMPLATES.md
#    - ENVIRONMENT.json

# 4. Verify
ls .ai/
# Output: STATUS.json, TASKS.json, CHANGELOG.md, dll
```

## Step 2: Daily Workflow

### Morning (Check Progress)
```bash
# Quick status
cat .ai/STATUS.json | grep "progress"

# See what's done
cat .ai/SUMMARY.md | head -50

# Next priorities
cat .ai/TASKS.json | grep '"status": "open"' -B 2
```

### Working (Update as You Go)
Setelah complete 1 task:
1. Update STATUS.json (increment progress, add to recently_completed)
2. Update TASKS.json (mark status="completed")
3. Add entry ke CHANGELOG.md
4. Regenerate SUMMARY.md

### Evening (Handoff to AI)
```bash
# Commit
git add .
git commit -m "feat(task-XXX): Your work"
git push

# AI siap lanjutkan besok!
```

---

# 🤖 UNTUK AI AGENT

## Workflow 3-Step:

```
1️⃣ READ (2 min)
   - QUICKSTART.md: Overview
   - STATUS.json: Progress 1.6%
   - TASKS.json: Find first open P0 task

2️⃣ EXECUTE (varies)
   - Follow acceptance_criteria
   - Reference SCHEMAS.md
   - Use ENVIRONMENT.json specs

3️⃣ UPDATE (5 min) ⚠️ MANDATORY
   - STATUS.json: Increment progress
   - TASKS.json: Mark completed
   - CHANGELOG.md: Add entry
   - SUMMARY.md: Regenerate
```

---

# 🎬 SIMULASI SKENARIO

## Skenario 1: AI Mulai Pertama Kali ⭐

### Context
- Project baru, progress 1.6% (only 2 HTML files)
- AI belum pernah touch project
- Need to build foundation

### Human Prompt
```
Halo AI, tolong lanjutkan development Kalkulator Waris Islam.

Instruksi:
1. Baca .ai/QUICKSTART.md terlebih dahulu
2. Lihat STATUS.json untuk kondisi saat ini
3. Pilih task priority tertinggi dari TASKS.json
4. Kerjakan task tersebut
5. Update semua briefing files setelah selesai

[Upload all .ai/ files]
```

### AI Response (Expected)
```
✅ READING CONTEXT...

Files read:
- QUICKSTART.md: Project at 1.6%, only 2 HTML exist
- STATUS.json: 2/124 files, 122 missing
- TASKS.json: task-000 is P0, no dependencies

✅ TASK SELECTED: task-000

Title: Setup folders + download libraries
Priority: P0
Estimated: 15 minutes
Deliverables:
  - Folder structure (css/, js/, data/, lib/)
  - fraction.min.js downloaded
  - jspdf.min.js downloaded

✅ EXECUTING...

[AI creates folders]
[AI downloads libraries from CDN]
[AI verifies file sizes]

✅ VALIDATION PASSED

All acceptance criteria met:
  ✓ Folders created
  ✓ fraction.min.js (24 KB)
  ✓ jspdf.min.js (178 KB)

✅ UPDATING BRIEFING...

Updated:
  - STATUS.json: 1.6% → 2.4%
  - TASKS.json: task-000 marked completed
  - CHANGELOG.md: Entry added
  - SUMMARY.md: Regenerated

TASK-000 COMPLETE! ✅

Next priority: task-001 (Extract CSS, 4-6 hrs)
Continue? [Y/N]
```

### Human Review
```bash
# Verify
cat .ai/STATUS.json | grep progress
# Output: "progress": 2.4

# Check folders
ls
# Output: css/, js/, data/, lib/ (created!)

# Approve
Response: "Yes, continue with task-001"
```

---

## Skenario 2: AI Melanjutkan Task

### Context
- Previous AI completed task-000
- Progress now 2.4%
- Next: task-001 (Extract CSS)

### Human Prompt
```
Continue with task-001
```

### AI Workflow (Auto)
```
✅ READING UPDATED CONTEXT...

STATUS.json: Progress 2.4%, task-000 done
TASKS.json: task-001 open, depends on task-000 (✓)

Can start? YES

✅ EXECUTING task-001: Extract CSS...

[AI reads index.html inline styles]
[AI reads step-form.html inline styles]
[AI creates css/variables.css with design tokens]
[AI creates css/style.css with all styles]
[AI updates HTML with <link> tags]
[AI tests - visual identical]

✅ VALIDATION PASSED

✅ UPDATING BRIEFING...

STATUS.json: 2.4% → 4.0%
TASKS.json: task-001 completed
CHANGELOG.md: Entry added
SUMMARY.md: Regenerated

TASK-001 COMPLETE! ✅

Next: task-002 (calculator-core.js, 3-4 days)
```

---

## Skenario 3: Human Mengambil Alih

### Context
- AI completed task-001 (CSS extraction)
- Human wants to code calculator-core.js manually

### Human Workflow
```bash
# 1. Review AI work
cat .ai/STATUS.json  # Progress: 4.0%
cat .ai/CHANGELOG.md | head -100
git log -5

# 2. Verify CSS
ls css/  # style.css, variables.css ✓
# Test in browser - looks good!

# 3. Take over task-002
cat .ai/TASKS.json | grep -A 20 '"id": "task-002"'

# 4. Code calculator-core.js
# [... 2 days of human coding ...]
# Result: js/calculator-core.js (87 KB)

# 5. Update briefing manually
nano .ai/STATUS.json
# progress: 4.0% → 12.0%
# Add to recently_completed

nano .ai/TASKS.json
# task-002: status="completed"
# completed_by: "Human Developer"

nano .ai/CHANGELOG.md
# Add entry with format from TEMPLATES.md

# 6. Commit
git add .
git commit -m "feat(task-002): Complete calculator-core by human"
git push

# 7. Handoff to AI
Prompt: "AI, continue with task-003 (app.js). 
I completed task-002. Briefing updated."
```

---

## Skenario 4: Multiple AI Sessions Sehari

### Morning AI (9 AM)
```
✅ Completed task-002 (calculator-core.js)
✅ Updated briefing: 4.0% → 12.0%
✅ Committed to git

Session ended: 11:00 AM
Next task: task-003 (app.js)
```

### Afternoon AI (2 PM) - Different Instance
```
Human: "Continue development"

✅ AI reads briefing:

STATUS.json:
  - Last update: 11:00 AM (3 hrs ago)
  - Progress: 12.0%
  - Recently: task-002 by Morning AI
  - Next: task-003 (app.js)

CHANGELOG.md:
  [2026-01-07 11:00] Morning AI
  - Created calculator-core.js
  - Tested with sample data

TASKS.json:
  - task-002: ✓ completed
  - task-003: ⏳ open, deps satisfied

✅ Starting task-003...

[... 2 hours work ...]

✅ COMPLETE!
Progress: 12.0% → 14.0%
Briefing updated

Ready for Evening AI or Human review
```

### Key Points
- ✅ Different AI seamlessly continues
- ✅ No context loss
- ✅ Clear handoff via timestamps
- ✅ Each AI updates for next AI

---

# 🎯 BEST PRACTICES

## For Humans ✅

**DO:**
- 📖 Read SUMMARY.md before starting
- 📝 Update briefing IMMEDIATELY after completing task
- 🔍 Review AI work before merging
- 💬 Add notes if you find issues

**DON'T:**
- ❌ Skip briefing updates
- ❌ Change STATUS.json without TASKS.json
- ❌ Forget to commit .ai/ folder
- ❌ Work on tasks with unmet dependencies

## For AI ✅

**DO:**
- 📖 ALWAYS read QUICKSTART.md first
- ✅ ALWAYS validate dependencies
- 📝 ALWAYS update 4 files (STATUS, TASKS, CHANGELOG, SUMMARY)
- 🔍 ALWAYS check acceptance_criteria

**DON'T:**
- ❌ Assume files exist (check first!)
- ❌ Skip dependencies
- ❌ Mark complete without updating briefing
- ❌ Invent own workflow (follow AI_RULES.md!)

---

# 🔧 TROUBLESHOOTING

## Issue 1: AI tidak baca briefing

**Solution:**
```
Prompt improvement:
"IMPORTANT: Before starting, you MUST:
1. Read .ai/QUICKSTART.md
2. Read .ai/STATUS.json
3. Read .ai/TASKS.json
4. Follow .ai/AI_RULES.md

Confirm you've read all 4 files before proceeding."
```

## Issue 2: Progress tidak sinkron

**Solution:**
```bash
# Count actual files
ls -R | wc -l

# Compare with STATUS.json
cat .ai/STATUS.json | jq '.files_status.completed'

# Fix if mismatch
```

## Issue 3: Dependency chain broken

**Solution:**
```bash
# Check dependencies
cat .ai/TASKS.json | jq '.tasks[] | select(.id == "task-003") | .dependencies'

# Verify completed
cat .ai/TASKS.json | jq '.tasks[] | select(.status == "completed") | .id'
```

---

# 📊 SUCCESS METRICS

✅ **Progress Accuracy**
```bash
ls -R | wc -l  # Actual files
cat .ai/STATUS.json | jq '.files_status.completed'
# Should match!
```

✅ **Dependency Chain Intact**
```bash
# No "completed" task should have "open" dependencies
node .ai/scripts/validate-dependencies.js
```

✅ **AI Handoff Smooth**
- Fresh AI can understand state in < 2 min
- Picks correct next task
- Updates briefing correctly

---

# 🎓 LEARNING CURVE

**Week 1:** Setup, understand files, try 1 AI session
**Week 2:** AI completes 2-3 tasks, briefing becomes habit
**Week 3:** Seamless handoffs, zero context loss, 3x velocity

---

**🎉 Selamat! Anda sekarang siap menggunakan Smart AI Brief System!**

**Next Steps:**
1. Setup .ai/ folder di project Anda
2. Run Skenario 1 (AI first time) 
3. Monitor dan adjust as needed

**Questions?** Check:
- AI_RULES.md for workflow details
- TEMPLATES.md for format examples
- SCHEMAS.md for data structures
