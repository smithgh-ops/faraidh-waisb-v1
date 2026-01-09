# 🤖 AI WORKING RULES - Kalkulator Waris Islam

**AI: Follow these rules STRICTLY. They are non-negotiable.**

---

## 📋 MANDATORY WORKFLOW

### At START of Every Session:

1. **Read Context (5 min)**
   ```
   ✅ Read QUICKSTART.md (if first time)
   ✅ Read PROJECT_BRIEF.md → Understand project
   ✅ Read STATUS.json → Know current state
   ✅ Read TASKS.json → Find your task
   ✅ Scan CHANGELOG.md → Last 3 entries only
   ```

2. **Task Selection**
   ```
   Algorithm:
   tasks_available = filter(status == "open")
   tasks_ready = filter(all dependencies completed)
   tasks_sorted = sort_by(priority DESC, task_id ASC)

   YOUR_TASK = tasks_sorted[0]  // Always pick first!
   ```

3. **Confirm Understanding**
   ```
   Before starting, state:
   - Task ID: task-XXX
   - Deliverables: [list]
   - Acceptance criteria: [list]
   - Estimated effort: X hours
   ```

---

### During Work:

1. **Follow Acceptance Criteria**
   - Read from TASKS.json
   - Check Definition of Done for task type
   - Reference SCHEMAS.md for data formats

2. **Use Exact Specifications**
   - Colors: Use from PROJECT_BRIEF.md (no invention!)
   - Spacing: Use --space-N variables
   - Font sizes: Use --text-* variables
   - No magic numbers!

3. **Validate as You Go**
   ```javascript
   // ✅ ALWAYS DO THIS:
   try {
     const result = calculate(heirs);
     if (!result) throw new Error('Calculation failed');
     return result;
   } catch (error) {
     console.error('Error:', error);
     showErrorModal(error.message);
     return null;
   }

   // ❌ NEVER DO THIS:
   const result = calculate(heirs);  // No error handling!
   ```

4. **Reference Existing Code**
   - Check `index.html` for design patterns
   - Check `step-form.html` for form structure
   - Don't reinvent - reuse patterns!

---

### At END of Every Session (CRITICAL):

**YOU MUST UPDATE 4 FILES:**

#### 1. STATUS.json
```json
{
  "last_update": "2026-01-03T{HH:MM:SS}+07:00",  // Current timestamp
  "updated_by": "AI Session #{N}",  // Your session number
  "current_phase": {
    "progress": {NEW_PERCENTAGE}  // Increment by task weight
  },
  "files_status": {
    "completed": {NEW_COUNT}  // Increment if file complete
  },
  "recently_completed": [
    {
      "task": "task-XXX: {description}",
      "completed_at": "{timestamp}",
      "completed_by": "AI Session #{N}",
      "files_affected": ["path/to/file"]
    }
  ]
}
```

#### 2. TASKS.json
```json
{
  "id": "task-XXX",
  "status": "completed",  // open → completed
  "completed_at": "{timestamp}",
  "completed_by": "AI Session #{N}",
  "actual_effort": "{hours}",  // Optional: if trackable
}
```

#### 3. CHANGELOG.md
```markdown
## [2026-01-{DD}] AI Session #{N}

### Added
- ✅ Created {file} - {what it does}

### Notes
- {Important decisions made}
- {Next AI should know this}
```

#### 4. SUMMARY.md (auto-generate)
```markdown
# 📊 PROJECT SUMMARY
*Last updated: {timestamp} by AI Session #{N}*

## Progress: {X}% Complete

### ✅ Completed This Session
1. task-XXX: {description}

### 🔄 In Progress
- (list if any)

### 🚧 Next Priorities
1. {From STATUS.json next_priorities}
```

**If you don't update these 4 files, your work is INVALID!**

---

## 🚫 NEVER DO THIS

### Code Quality
```javascript
// ❌ NEVER use decimals
const share = 0.166666;

// ✅ ALWAYS use Fraction.js
const share = new Fraction(1, 6);

// ❌ NEVER hardcode strings
const text = "Ayah";

// ✅ ALWAYS use i18n
const text = i18n.t('heirs.father');

// ❌ NEVER console.log in production
console.log("Debug info");

// ✅ ALWAYS use proper logging
logger.debug("Debug info");

// ❌ NEVER ignore errors
calculate(heirs);

// ✅ ALWAYS handle errors
try { calculate(heirs); } catch (e) { handleError(e); }
```

### Data Format
```json
// ❌ WRONG heir format
{
  "id": "father",
  "name": "Ayah"  // Missing ar/en!
}

// ✅ CORRECT heir format
{
  "id": "father",
  "name": {
    "ar": "الأب",
    "id": "Ayah",
    "en": "Father"
  }
}
```

### File Size
```
❌ NEVER exceed estimates by >20%
✅ ALWAYS keep files within size targets
❌ NEVER embed huge tafsir (link instead)
✅ ALWAYS compress/optimize
```

---

## ✅ ALWAYS DO THIS

### Calculation Rules
1. **Use Fraction.js for ALL calculations**
2. **Validate heirs before calculation**
3. **Check hijab (blocking) rules**
4. **Provide dalil for every result**
5. **Handle edge cases (aul, radd)**

### Data Creation
1. **Follow SCHEMAS.md format exactly**
2. **Include ar/id/en for all text**
3. **Add dalil references**
4. **Keep content concise (<500 words tafsir)**
5. **Validate with validation script**

### Design Implementation
1. **Use CSS variables (no hardcoded colors!)**
2. **Follow 8px spacing grid**
3. **Mobile-first responsive**
4. **Glassmorphic style for cards**
5. **Neon glow in dark mode**

### Documentation
1. **Add JSDoc comments to functions**
2. **Update CHANGELOG.md every session**
3. **Generate SUMMARY.md for human**
4. **Document decisions in notes**

---

## 🎯 TASK SELECTION ALGORITHM

### Priority Order
```
P0 (Critical) > P1 (High) > P2 (Medium) > P3 (Low)
```

### If Multiple Same Priority
```
Pick task with LOWEST task_id
Example: task-001 before task-002
```

### Check Dependencies
```python
def can_start_task(task):
    for dep in task.dependencies:
        dep_task = find_task(dep)
        if dep_task.status != 'completed':
            return False  # Wait for dependency
    return True
```

### Example Selection
```
Available tasks:
- task-001 (P0, no deps)
- task-003 (P1, no deps)
- task-005 (P1, depends on task-001)

Selection:
1. Filter by status='open' → all 3
2. Filter by dependencies → task-001, task-003
3. Sort by priority → task-001 (P0) first
4. Pick: task-001 ✅
```

---

## 🆘 DECISION TREES

### Scenario: Multiple P0 Tasks Available
```
Decision: Pick task with lowest task_id
Reason: Maintains sequential progress
```

### Scenario: Task Partially Done by Previous AI
```
Check completion percentage in TASKS.json:
- If <50%: Continue working on it
- If >50%: Complete it before moving
- If unclear: Ask in STATUS.json questions_for_human
```

### Scenario: Found Bug in Previous Work
```
Assess severity:
- CRITICAL (app breaks): Fix immediately, document in CHANGELOG
- MEDIUM (wrong result): Create new P1 task
- MINOR (typo/style): Create new P2 task
```

### Scenario: Requirement Unclear
```
1. Check PROJECT_BRIEF.md → Still unclear?
2. Check existing code (index.html/step-form.html) → Still unclear?
3. Document question in STATUS.json → questions_for_human
4. Skip to next clear task
```

### Scenario: Found Conflicting Info
```
Source priority (highest to lowest):
1. PROJECT_BRIEF.md (source of truth)
2. TASKS.json (implementation detail)
3. CHANGELOG.md (historical, might be outdated)

Resolution:
- Trust PROJECT_BRIEF.md
- Document conflict in CHANGELOG.md
- Add note to STATUS.json → inconsistencies_found
```

---

## 🛡️ DATA VALIDATION

### Before Creating/Updating Data Files

1. **Check Schema**
   ```bash
   node .ai/scripts/validate-data.js --file=data/heirs/primary/father.json
   ```

2. **Required Fields Checklist**
   ```
   ✅ id (string)
   ✅ name.ar (Arabic text)
   ✅ name.id (Indonesian text)
   ✅ name.en (English text)
   ✅ shares.jumhur (object)
   ✅ shares.hanafi (object)
   ✅ shares.maliki (object)
   ✅ shares.shafii (object)
   ✅ shares.hanbali (object)
   ✅ dalil (array of references)
   ```

3. **Share Values Validation**
   ```
   Valid shares: 1/6, 1/4, 1/3, 1/2, 2/3, 'residue'
   Invalid: 1/5, 0.166, decimals
   ```

---

## 💾 BACKUP BEFORE MODIFY

### If Modifying Existing Files (>10 KB or Critical)
```bash
# Create timestamped backup
cp js/calculator-core.js js/calculator-core.js.backup-2026-01-03

# Make changes
# ... edit file ...

# If successful: delete backup
# If failed: restore from backup
```

### Critical Files List
```
- js/calculator-core.js (85 KB)
- js/ui-manager.js (45 KB)
- js/data-loader.js (15 KB)
- All data/heirs/primary/*.json
- manifest.json
- service-worker.js
```

---

## 📐 DESIGN SYSTEM ENFORCEMENT

### CSS Variables (MANDATORY)
```css
:root {
  /* Use THESE exact values from PROJECT_BRIEF.md */
  --color-primary: #8B5CF6;
  --color-secondary: #6366F1;
  --color-accent: #06B6D4;

  --space-1: 0.5rem;  /* 8px */
  --space-2: 1rem;    /* 16px */
  --space-3: 1.5rem;  /* 24px */

  --text-base: 1rem;
  --text-lg: 1.125rem;

  /* DO NOT invent new values! */
}
```

### Glassmorphic Component Template
```css
.card {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  padding: var(--space-6);
}
```

---

## 🎓 FIQIH ACCURACY RULES

### Calculation Validation
```javascript
// ALWAYS validate against kitab fiqih
function validateShares(heirs, shares) {
  // Example: Mother with children should get 1/6
  const mother = heirs.find(h => h.id === 'mother');
  const hasChildren = heirs.some(h => h.category === 'children');

  if (mother && hasChildren) {
    if (!shares.mother.equals(new Fraction(1, 6))) {
      throw new Error('Mother share incorrect: should be 1/6 with children');
    }
  }
}
```

### Dalil Requirements
```
EVERY calculation result MUST show:
1. Arabic text (with proper diacritics)
2. Translation ID (accurate)
3. Translation EN (accurate)
4. Reference: kitab name + volume + page
5. Author name
```

### Mazhab Differences
```
When implementing mazhab-specific logic:
1. Document WHY different (scholarly reasoning)
2. Provide dalil for EACH opinion
3. Show comparison clearly
4. Let user choose (no forcing one view)
```

---

## 📊 PROGRESS TRACKING

### File Size Monitoring
```
After creating file, check size:
- Target: {from TASKS.json}
- Actual: {your file size}
- Status: ✅ OK if <110% of target
         ⚠️ WARNING if 110-120%
         ❌ TOO LARGE if >120%

If too large:
1. Remove verbose comments
2. Reduce tafsir length
3. Link to external references
```

### Completion Percentage
```
Calculate:
progress = (completed_files / total_files) * 100

Update STATUS.json:
current_phase.progress = {new_percentage}
```

---

## 🔄 HANDOFF TO NEXT AI

### Before Ending Session
1. **Clean up code** (remove console.log, TODOs)
2. **Update all 4 files** (STATUS, TASKS, CHANGELOG, SUMMARY)
3. **Document decisions** (why you chose approach X)
4. **Flag issues** (if found bugs/blockers)
5. **Suggest next steps** (what next AI should do)

### Good Handoff Example
```markdown
## Notes for Next AI:
- Completed calculator-core.js with basic 4 heirs
- Found edge case: need to handle orphaned grandchildren
- Suggest next: Implement grandfather muqasamah (complex!)
- Testing notes: Tested with sample data, works for simple cases
```

---

## 📈 QUALITY CHECKLIST

Before marking task complete:

### Code
- [ ] No syntax errors
- [ ] All functions have JSDoc
- [ ] Error handling present
- [ ] No console.log
- [ ] Follows DRY principle
- [ ] Readable variable names

### Data
- [ ] Schema valid (ran validation)
- [ ] All required fields present
- [ ] ar/id/en complete
- [ ] Dalil references exist
- [ ] File size within target

### Design
- [ ] Uses CSS variables
- [ ] Responsive (tested mentally)
- [ ] Follows glassmorphic style
- [ ] Proper spacing (8px grid)
- [ ] Accessibility attributes

### Documentation
- [ ] STATUS.json updated
- [ ] TASKS.json updated
- [ ] CHANGELOG.md entry added
- [ ] SUMMARY.md generated
- [ ] Decisions documented

---

**REMEMBER: If you don't update briefing files, your work is INVALID and will be redone by next AI!**

---

**Last Updated:** 2026-01-03  
**Enforce:** STRICTLY  
**Exceptions:** NONE
