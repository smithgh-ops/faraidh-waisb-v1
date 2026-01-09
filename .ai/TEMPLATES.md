# 📝 TEMPLATES & FORMAT EXAMPLES

**AI, gunakan templates ini untuk memastikan format yang KONSISTEN!**

---

## 📋 CHANGELOG.md ENTRY TEMPLATE

```markdown
## [YYYY-MM-DD HH:MM] AI Session #N

### ✅ Added
- ✅ Created {file_path} ({size}) - {brief description of what it does}
- ✅ Implemented {feature} - {why it's important}
- ✅ Added {data/content} to {file} - {what data and why}

### 📝 Changed
- 📝 Updated {file_path} - {what changed specifically}
  - Before: {old behavior}
  - After: {new behavior}
  - Reason: {why this change}

### 🐛 Fixed
- 🐛 Fixed {bug_description} in {file_path}
  - Issue: {what was wrong}
  - Root cause: {why it happened}
  - Solution: {how it's fixed}

### 🗑️ Removed
- 🗑️ Deleted {file_path} - {why it's no longer needed}

### 📊 Progress Update
- Phase: Fase {N} - {phase_name}
- Overall completion: {XX}% → {YY}% (+{ZZ}%)
- Files completed: {N} → {N+M} (+{M} files)
- Tasks completed: task-{XXX}, task-{YYY}

### ⚠️ Blockers/Issues
- {Issue description if any}
- {What's blocking progress}

### 💡 Notes
- {Important context for next AI session}
- {Decisions made and why}
- {Things to watch out for}

### ⏱️ Time Spent
- Estimated: {X} hours
- Actual: {Y} hours (if trackable)

### 🔗 References
- Related tasks: task-{XXX}, task-{YYY}
- Related files: {file1}, {file2}
- Dalil added: {dalil_id1}, {dalil_id2}

---
```

### **EXAMPLE REAL ENTRY:**

```markdown
## [2026-01-03 14:30] AI Session #7

### ✅ Added
- ✅ Created js/calculator-core.js (87 KB) - Main calculation engine with Fraction.js integration
- ✅ Implemented basic inheritance calculation for 4 primary heirs (father, mother, son, daughter)
- ✅ Added Aul detection algorithm based on Atsar Umar RA
- ✅ Created data/heirs/primary/father.json (64 KB) - Complete father heir data with 5 mazhab rules

### 📝 Changed
- 📝 Updated STATUS.json - Marked task-001 as completed
  - Before: completion: 16%, task-001: open
  - After: completion: 19%, task-001: completed
  - Reason: Calculator core finished and tested

### 🐛 Fixed
- 🐛 Fixed validation error in step-form.html
  - Issue: Form allowed negative harta values
  - Root cause: Missing min="0" attribute on input
  - Solution: Added min="0" and validation message

### 📊 Progress Update
- Phase: Fase 1 - Core Calculator & Basic UI
- Overall completion: 16% → 19% (+3%)
- Files completed: 20 → 23 (+3 files)
- Tasks completed: task-001 (calculator-core.js), task-002-a (father.json, mother.json)

### ⚠️ Blockers/Issues
- None currently! Ready for next task.

### 💡 Notes
- Calculator tested mentally with case: Ayah (1/6), Ibu (1/6), Anak laki (ashabah) - works correctly
- Fraction.js integration smooth, no decimal rounding errors
- Need to add more test cases for edge scenarios (aul, radd)
- Next priority: Complete remaining heir primary files (13 files)

### ⏱️ Time Spent
- Estimated: 3 hours
- Actual: 2.5 hours (faster than expected!)

### 🔗 References
- Related tasks: task-001, task-002-a
- Related files: js/calculator-core.js, data/heirs/primary/father.json, data/heirs/primary/mother.json
- Dalil added: an-nisa-11, hadith-ashabah

---
```

---

## 📄 STATUS.json UPDATE TEMPLATE

```json
{
  "version": "1.0.0",
  "last_update": "YYYY-MM-DDTHH:MM:SS+07:00",
  "updated_by": "AI Session #N",
  "git_commit": "abc123f",
  "git_branch": "main",

  "current_phase": {
    "id": "fase-{N}",
    "name": "{Phase Name}",
    "target_completion": "YYYY-MM-DD",
    "progress": XX,
    "status": "in_progress|on_hold|completed"
  },

  "files_status": {
    "total": 124,
    "completed": XX,
    "in_progress": Y,
    "not_started": ZZ
  },

  "critical_blockers": [
    {
      "id": "blocker-{N}",
      "priority": "P0|P1|P2",
      "issue": "{Clear description of issue}",
      "impact": "{What this blocks}",
      "assigned_to": "AI Session #N|null",
      "status": "open|in_progress|resolved",
      "created_at": "YYYY-MM-DDTHH:MM:SS+07:00",
      "resolved_at": "YYYY-MM-DDTHH:MM:SS+07:00|null"
    }
  ],

  "recently_completed": [
    {
      "task": "task-{XXX}: {Short description}",
      "completed_at": "YYYY-MM-DDTHH:MM:SS+07:00",
      "completed_by": "AI Session #N",
      "files_affected": ["path/to/file1", "path/to/file2"],
      "estimated_hours": X,
      "actual_hours": Y
    }
  ],

  "next_priorities": [
    "task-{XXX}: {Description} (P0)",
    "task-{YYY}: {Description} (P1)",
    "task-{ZZZ}: {Description} (P1)"
  ],

  "questions_for_human": [
    {
      "question": "{What you're unsure about}",
      "context": "{Why this matters}",
      "options": ["{Option A}", "{Option B}"],
      "blocking": true|false
    }
  ],

  "inconsistencies_found": [
    {
      "description": "{What's inconsistent}",
      "files": ["{file1}", "{file2}"],
      "resolution": "{How you resolved it or needs human decision}"
    }
  ]
}
```

---

## 📋 TASKS.json TASK UPDATE TEMPLATE

```json
{
  "id": "task-{XXX}",
  "title": "{Task title}",
  "priority": "P0|P1|P2|P3",
  "status": "open|in_progress|completed|blocked",
  "phase": "fase-{N}",
  "estimated_effort": "{X} hours|days",

  "dependencies": [
    {
      "task_id": "task-{YYY}",
      "status_required": "completed",
      "reason": "{Why this dependency exists}"
    }
  ],

  "deliverables": [
    "{file_path} - {what it contains}",
    "{feature} - {what it does}"
  ],

  "acceptance_criteria": [
    "✅ {Specific measurable criteria}",
    "✅ {Another criteria}",
    "✅ {Test/validation criteria}"
  ],

  "assigned_to": "AI Session #N|null",
  "started_at": "YYYY-MM-DDTHH:MM:SS+07:00|null",
  "completed_at": "YYYY-MM-DDTHH:MM:SS+07:00|null",
  "completed_by": "AI Session #N|null",

  "completion_notes": {
    "what_was_done": "{Summary}",
    "challenges": ["{Challenge 1}", "{Challenge 2}"],
    "decisions": ["{Decision made and why}"],
    "files_created": ["{file1}", "{file2}"],
    "files_modified": ["{file3}", "{file4}"],
    "validation_passed": true|false
  }
}
```

---

## 🔀 GIT COMMIT MESSAGE TEMPLATE

```
type(scope): Brief description (max 72 chars)

Detailed explanation of changes:
- Change 1 with reason
- Change 2 with reason
- Change 3 with reason

Breaking changes (if any):
- Breaking change description

Refs: task-XXX, task-YYY
Session: AI #N
Time: X hours
```

### **Commit Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation only
- `refactor`: Code refactoring
- `test`: Adding tests
- `chore`: Maintenance tasks
- `perf`: Performance improvement
- `style`: Code style/formatting

### **EXAMPLES:**

```
feat(calculator): Add calculator-core.js with Fraction.js

Implemented main calculation engine with:
- Fardh share calculation for primary heirs
- Ashabah calculation with residue
- Aul detection algorithm (Atsar Umar RA)
- Validation for heir conflicts

Refs: task-001
Session: AI #7
Time: 2.5 hours
```

```
fix(validation): Prevent negative harta input

Added min="0" validation to harta input field in step-form.html
to prevent invalid negative estate values.

Issue: Users could enter negative numbers causing calculation errors
Root cause: Missing HTML5 validation attribute
Solution: Added min="0" and error message

Refs: task-025
Session: AI #8
Time: 0.5 hours
```

```
docs(schemas): Add complete heir data schema examples

Added detailed JSON schemas for:
- Heir data structure with all 5 mazhabs
- Dalil data with Arabic + translations + references
- Mazhab differences documentation

Refs: task-030
Session: AI #9
Time: 1 hour
```

---

## 📊 SUMMARY.md GENERATION TEMPLATE

```markdown
# 📊 PROJECT SUMMARY
*Auto-generated by AI Session #{N} on {YYYY-MM-DD HH:MM}*

## 🎯 Overall Progress: {XX}% Complete

**Phase:** Fase {N} - {Phase Name}  
**Status:** {On Track|At Risk|Behind Schedule|Ahead of Schedule}  
**Last Updated:** {YYYY-MM-DD HH:MM} by AI Session #{N}

---

## ✅ Completed Today

### Tasks Finished ({N} tasks)
1. ✅ **task-{XXX}**: {Task title}
   - Files: {file1}, {file2}
   - Time: {X} hours
   - Impact: {What this enables}

2. ✅ **task-{YYY}**: {Task title}
   - Files: {file3}
   - Time: {Y} hours
   - Impact: {What this enables}

### Files Created/Modified ({N} files)
- ✅ `{file_path}` ({size}) - {description}
- ✅ `{file_path}` ({size}) - {description}

---

## 🔄 In Progress

### Current Work ({N} tasks)
- **task-{ZZZ}**: {Task title}
  - Status: {XX}% done
  - Remaining: {What's left to do}
  - Blocker: {None | Description}
  - ETA: {When it will be done}

---

## 🚧 Blocked Tasks ({N} tasks)

1. **task-{AAA}**: {Task title} (P{0|1|2})
   - Waiting for: {What's blocking it}
   - Impact: {What this blocks downstream}
   - Action needed: {What needs to happen}

---

## 📈 Progress Metrics

### Phase Completion
| Phase | Target | Current | Delta |
|-------|--------|---------|-------|
| Fase 1 | 100% | {XX}% | {+/-YY}% |
| Fase 2 | 0% | {XX}% | {+/-YY}% |

### File Completion
| Category | Total | Done | Remaining |
|----------|-------|------|-----------|
| JavaScript | 14 | {N} | {14-N} |
| Data JSON | 68 | {N} | {68-N} |
| CSS | 5 | {N} | {5-N} |
| Templates | 6 | {N} | {6-N} |
| **TOTAL** | **124** | **{N}** | **{124-N}** |

### Velocity
- **This week**: +{XX}% (target: +10%)
- **Average per day**: +{YY}%
- **Estimated completion**: {YYYY-MM-DD}

---

## 🔴 Critical Issues ({N} issues)

### Active Blockers
1. **P0**: {Issue description}
   - Impact: {What this affects}
   - Status: {What's being done}
   - Owner: {AI Session #N | Human review needed}

2. **P1**: {Issue description}
   - Impact: {What this affects}
   - Action: {What needs to happen}

---

## 📝 Next Session Should Focus On

### Immediate Priorities (P0)
1. 🔴 **task-{XXX}**: {Task title}
   - Why: {Critical reason}
   - Estimated: {X} hours
   - Depends on: {Dependencies}

### High Priority (P1)
2. 🟠 **task-{YYY}**: {Task title}
   - Why: {Important reason}
   - Estimated: {X} hours

### Can Be Deferred (P2)
3. 🟡 **task-{ZZZ}**: {Task title}
   - Nice to have
   - Estimated: {X} hours

---

## 💡 Key Decisions Made

1. **{Decision title}**
   - Decision: {What was decided}
   - Reason: {Why this decision}
   - Impact: {What this affects}
   - Documented in: {file reference}

---

## ⚠️ Watch Out For

- ⚠️ {Potential issue or risk}
- ⚠️ {Something to be careful about}
- ⚠️ {Technical debt or temporary solution}

---

## 🎓 Lessons Learned

- 💡 {What worked well}
- 💡 {What didn't work}
- 💡 {What to do differently next time}

---

## 📊 Quality Metrics

- ✅ Schema validation: {Passed|Failed}
- ✅ File size compliance: {Within limits|Exceeded}
- ✅ Dalil references: {Complete|Partial}
- ✅ Multi-language: {ID+EN complete|Partial}

---

## 🔄 Recent Changes (Last 3 Entries)

```
[2026-01-03 14:30] AI #7: Created calculator-core.js + father.json
[2026-01-03 12:00] AI #6: Fixed validation in step-form.html
[2026-01-03 10:00] AI #5: Updated PROJECT_BRIEF.md
```

---

## 📞 Human Review Needed

{Yes|No} - {Reason if yes}

---

**Generated by:** AI Session #{N}  
**Next update:** After next task completion  
**Full details:** See CHANGELOG.md, STATUS.json, TASKS.json
```

---

## 🗂️ DATA FILE TEMPLATES

### **Heir Data Template (Copy this for new heir files)**

```json
{
  "id": "{heir_id}",
  "name": {
    "ar": "{Arabic name}",
    "id": "{Indonesian name}",
    "en": "{English name}"
  },
  "category": "primary|extended|dzawil_arham",
  "type": "ashabul_furudh|ashabah|both|dzawil_arham",
  "shares": {
    "jumhur": {
      "conditions": [
        {
          "if": "{condition}",
          "share": "{fraction|residue}",
          "type": "fardh|ashabah|both",
          "dalil": ["{dalil_id}"],
          "explanation": {
            "ar": "{Arabic explanation}",
            "id": "{Indonesian explanation}",
            "en": "{English explanation}"
          }
        }
      ]
    },
    "hanafi": { "reference": "jumhur" },
    "maliki": { "reference": "jumhur" },
    "shafii": {
      "conditions": [
        {
          "if": "{condition}",
          "share": "{different_share}",
          "difference_from_jumhur": "{Why different}",
          "dalil": ["{dalil_id}"]
        }
      ]
    },
    "hanbali": { "reference": "jumhur" }
  },
  "dalil": ["{dalil_id1}", "{dalil_id2}"],
  "blocks": ["{heir_id1}", "{heir_id2}"],
  "blocked_by": ["{heir_id1}"],
  "notes": {
    "ar": "{Arabic notes}",
    "id": "{Indonesian notes}",
    "en": "{English notes}"
  }
}
```

### **Dalil Quran Template**

```json
{
  "id": "{surah}-{ayat}",
  "type": "quran",
  "surah": {
    "name": "{Surah Name}",
    "number": {X},
    "arabic": "{Arabic Name}"
  },
  "ayat": {X},
  "arabic": "{Full Arabic text with tashkeel}",
  "translation": {
    "id": "{Indonesian translation}",
    "en": "{English translation}"
  },
  "tafsir": {
    "id": "{Brief tafsir Indonesian (max 500 words)}",
    "en": "{Brief tafsir English (max 500 words)}"
  },
  "references": [
    {
      "book": {
        "ar": "{Arabic book name}",
        "id": "{Indonesian book name}",
        "en": "{English book name}"
      },
      "author": "{Author name}",
      "full_name": "{Full author name with titles}",
      "volume": "{X|X/Y}",
      "page": "{XXX-YYY}"
    }
  ],
  "related_heirs": ["{heir_id1}", "{heir_id2}"],
  "related_rules": ["{rule1}", "{rule2}"],
  "tags": ["{tag1}", "{tag2}", "{tag3}"]
}
```

### **Dalil Hadith Template**

```json
{
  "id": "{hadith_key}",
  "type": "hadith",
  "arabic": "{Arabic text with tashkeel}",
  "translation": {
    "id": "{Indonesian translation}",
    "en": "{English translation}"
  },
  "source": "{Sahih Bukhari|Sahih Muslim|Sunan Abu Dawud|etc}",
  "book": "{Book name in collection}",
  "hadith_number": "{XXXX}",
  "narrator": "{Primary narrator} RA",
  "chain": "{Brief chain if important}",
  "grade": "Sahih|Hasan|Daif",
  "scholar_grading": [
    {
      "scholar": "{Scholar name}",
      "grade": "Sahih|Hasan|Daif",
      "source": "{Book/statement}"
    }
  ],
  "explanation": {
    "id": "{Brief explanation Indonesian}",
    "en": "{Brief explanation English}"
  },
  "references": [
    {
      "book": {
        "ar": "{Arabic sharh name}",
        "id": "{Indonesian sharh name}",
        "en": "{English sharh name}"
      },
      "author": "{Author}",
      "volume": "{X}",
      "page": "{XXX}"
    }
  ],
  "related_heirs": ["{heir_id}"],
  "related_rules": ["{rule}"],
  "tags": ["{tag1}", "{tag2}"]
}
```

---

## 🧪 TEST CASE TEMPLATE

```javascript
/**
 * Test Case: {Test Name}
 * Purpose: {What this tests}
 * Expected: {Expected result}
 */
const testCase = {
  name: "{Test case name}",
  pewaris: {
    nama: "{Name}",
    harta: {amount in Fraction},
    jenis_kelamin: "laki|perempuan"
  },
  heirs: [
    {
      id: "{heir_id}",
      jumlah: {X},
      jenis_kelamin: "laki|perempuan"
    }
  ],
  mazhab: "jumhur|hanafi|maliki|shafii|hanbali",
  expected_result: {
    heir_id: {
      share: "{fraction}",
      amount: {Fraction},
      type: "fardh|ashabah|both"
    }
  },
  special_rules: {
    hasAul: true|false,
    hasRadd: true|false,
    hijab: ["{heir blocked by another}"]
  }
};
```

---

**END OF TEMPLATES.md**

*AI: Copy these templates and fill in the values. Keep formatting consistent!*
