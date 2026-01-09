# 🎯 PROJECT BRIEF - Kalkulator Waris Islam

**AI: Read this to understand the ENTIRE project context.**

---

## 📌 EXECUTIVE SUMMARY

### What is This Project?
**Kalkulator Waris Islam** adalah Progressive Web Application (PWA) untuk menghitung pembagian warisan sesuai hukum Islam dengan dukungan **5 mazhab fiqih** (Jumhur + Hanafi + Maliki + Syafi'i + Hanbali).

### Why This Matters?
- ⚖️ **Akurasi Critical:** Kesalahan perhitungan = melanggar hak ahli waris
- 📚 **Edukasi:** Masyarakat butuh panduan lengkap hukum waris
- 🌍 **Aksesibilitas:** Tidak semua bisa konsultasi ulama
- 📖 **Transparansi:** Setiap hasil disertai dalil lengkap (Arab + ID + EN)
- 🕌 **Multi-Mazhab:** Respek terhadap khilafiyah ulama

### Success Criteria
1. ✅ Akurasi 100% menggunakan sistem pecahan (Fraction.js)
2. ✅ Semua hasil disertai dalil dari kitab mu'tabar
3. ✅ Support 5 mazhab dengan dokumentasi perbedaan
4. ✅ Offline-capable PWA (< 5 MB bundle)
5. ✅ Bilingual (Indonesia + English)

---

## 🎯 CORE REQUIREMENTS (NON-NEGOTIABLE)

### 1. Calculation System
```
✅ MUST: Use Fraction.js for ALL calculations
❌ NEVER: Use decimals or floating point
✅ MUST: Support complex cases (Aul, Radd, Hijab, Muqasamah)
✅ MUST: Validate against kitab fiqih klasik
```

**Example:**
```javascript
// ✅ CORRECT
const share = new Fraction(1, 6);  // 1/6
const result = share.mul(harta);   // Exact calculation

// ❌ WRONG
const share = 0.1666666;  // Rounding error!
```

### 2. Five Mazhabs Support
```
1. Jumhur (Default) - Majority opinion
2. Hanafi - Imam Abu Hanifah
3. Maliki - Imam Malik
4. Syafi'i - Imam Syafi'i
5. Hanbali - Imam Ahmad bin Hanbal
```

**Critical Differences to Implement:**
- Cucu perempuan dengan 2 anak perempuan (Jumhur vs Syafi'i)
- Kakek dengan saudara (Muqasamah)
- Dzawil arham handling
- Aul calculation variations

### 3. Dalil Requirements
Every calculation result MUST show:
```json
{
  "dalil": {
    "arabic": "يُوصِيكُمُ اللَّهُ فِي أَوْلَادِكُمْ...",
    "translation_id": "Allah mensyariatkan kepadamu...",
    "translation_en": "Allah instructs you...",
    "references": [
      {
        "book_ar": "تفسير القرطبي",
        "book_id": "Tafsir Al-Qurtubi",
        "book_en": "Tafsir Al-Qurtubi",
        "author": "Al-Qurtubi",
        "volume": 5,
        "page": 47
      }
    ]
  }
}
```

**Minimum 100+ kitab references from:**
- Tafsir: Al-Qurtubi, Ibn Katsir, Al-Thabari
- Fiqih: Al-Mughni, Al-Umm, Al-Hidayah, Al-Mudawwanah
- Hadits: Sahih Bukhari, Sahih Muslim, Sunan Abu Dawud

### 4. Export & Output
```
✅ MUST: PDF export with dalil lengkap
✅ MUST: Print-friendly layout
❌ NEVER: Excel export (requirement explicitly removed)
✅ MUST: Currency format without symbol (1.000.000 not $1,000,000)
```

### 5. PWA Requirements
```
✅ MUST: Work offline (service worker)
✅ MUST: "Add to Home Screen" capability
✅ MUST: < 5 MB total bundle size
✅ MUST: Fast load (< 3 sec on 4G)
```

---

## 🏗️ PROJECT STRUCTURE (124 Files)

### HTML Structure (Multiple Pages)
```
index.html          - Landing page with hero
calculator.html     - Multi-step form (from step-form.html)
result.html         - Calculation results with dalil
education.html      - 8 bab education content
dalil.html          - Dalil database viewer
cases.html          - Classical cases study
quiz.html           - Interactive quiz (3 levels)
comparison.html     - Compare 5 mazhab results
```

### Critical Files Priority
```
P0 (Build First):
- js/calculator-core.js (85 KB) - MAIN ENGINE
- data/heirs/primary/*.json (17 files)
- data/mazhab/*.json (6 files)

P1 (Build Second):
- js/ui-manager.js (45 KB)
- data/dalil/quran/*.json (10 files)
- templates/popup-warning.html

P2 (Build Third):
- js/pdf-generator.js (28 KB)
- data/education/*.json (8 files)
- PWA files (manifest, service-worker)
```

---

## 🎨 DESIGN SYSTEM (From contoh-design-2.jpg & contoh-design-3.jpg)

### Color Palette
```css
/* Light Mode */
--color-primary: #8B5CF6;        /* Purple */
--color-secondary: #6366F1;      /* Indigo */
--color-accent: #06B6D4;         /* Cyan */
--color-bg: #F8FAFC;             /* Light gray */
--color-text: #1E293B;           /* Dark slate */

/* Dark Mode */
--color-primary-dark: #A78BFA;   /* Light purple */
--color-accent-dark: #22D3EE;    /* Neon cyan */
--color-bg-dark: #0F172A;        /* Navy */
--color-surface-dark: #1E293B;   /* Dark slate */
--color-text-dark: #F1F5F9;      /* Light */
```

### Typography
```css
--font-primary: 'Inter', sans-serif;
--font-arabic: 'Amiri', serif;

--text-xs: 0.75rem;   /* 12px */
--text-sm: 0.875rem;  /* 14px */
--text-base: 1rem;    /* 16px */
--text-lg: 1.125rem;  /* 18px */
--text-xl: 1.25rem;   /* 20px */
--text-2xl: 1.5rem;   /* 24px */
--text-3xl: 1.875rem; /* 30px */
--text-4xl: 2.25rem;  /* 36px */
```

### Spacing (8px base)
```css
--space-1: 0.5rem;   /* 8px */
--space-2: 1rem;     /* 16px */
--space-3: 1.5rem;   /* 24px */
--space-4: 2rem;     /* 32px */
--space-5: 2.5rem;   /* 40px */
--space-6: 3rem;     /* 48px */
--space-8: 4rem;     /* 64px */
```

### Component Styles
```css
/* Glassmorphic Card */
.card {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

/* Gradient Button */
.btn-primary {
  background: linear-gradient(135deg, #8B5CF6, #6366F1);
  box-shadow: 0 4px 14px rgba(139, 92, 246, 0.4);
  border-radius: 12px;
  padding: 12px 24px;
}

/* Neon Glow (Dark Mode) */
.glow {
  box-shadow: 0 0 20px rgba(34, 211, 238, 0.6);
}
```

---

## 📐 FIQIH CALCULATION RULES (DETAILED)

### Aul (العول) - Increase Denominator
**When:** Sum of fardh shares exceeds total estate (> 1)

**Formula:**
```
Example Case:
- Wife: 1/4
- 2 Full Sisters: 2/3
- Mother: 1/6

Calculation:
1/4 + 2/3 + 1/6 = 3/12 + 8/12 + 2/12 = 13/12 (exceeds!)

Apply Aul:
- New denominator: 13 (instead of 12)
- Wife: 3/13
- 2 Sisters: 8/13
- Mother: 2/13
Total: 13/13 = 1 ✅
```

**Dalil:** Atsar Umar ibn Al-Khattab (data/dalil/atsar/umar.json)

**Mazhab Agreement:** All 5 mazhabs agree on Aul

### Radd (الرد) - Return Surplus
**When:** Sum of fardh shares < total estate AND no ashabah

**Formula:**
```
Example Case:
- Mother: 1/3
- Grandmother: 1/6
Total: 1/3 + 1/6 = 3/6 = 1/2 (surplus: 1/2)

Apply Radd:
- Distribute surplus proportionally
- Mother: 1/3 × 2 = 2/3
- Grandmother: 1/6 × 2 = 1/3
Total: 2/3 + 1/3 = 1 ✅
```

**Dalil:** Majority of Sahabah and Tabi'in

**Mazhab Differences:**
- Jumhur, Hanafi, Hanbali: Apply Radd to all except spouse
- Maliki: No Radd to anyone (surplus goes to Baitul Mal)
- Syafi'i (old): No Radd, (new): Allow Radd

### Hijab (الحجب) - Blocking Rules
**Principle:** Closer relative blocks farther relative

**Examples:**
```
1. Father blocks Grandfather
   - If father alive → grandfather gets nothing

2. Son blocks Grandson
   - If son alive → grandson gets nothing

3. Full Brother blocks Paternal Brother
   - If full brother exists → paternal brother gets nothing

4. Multiple Children block Mother from 1/3 to 1/6
```

**Auto-Validation Required:**
- If user selects "Father alive" → auto-disable "Grandfather" option
- If user selects "Son exists" → auto-disable "Grandson" option
- Show tooltip: "Terhalang karena ada [blocker]"

### Muqasamah Kakek (جد مع إخوة) - Grandfather with Siblings
**Complex Case:** When grandfather competes with siblings

**Methods:**
1. **Muqasamah:** Grandfather as full brother (shares with siblings)
2. **Fardh:** Grandfather takes 1/6
3. **Best of:** Grandfather takes whichever is better

**Mazhab Differences:**
- Jumhur & Syafi'i: Use muqasamah method
- Hanafi: Grandfather = Father (blocks siblings)
- Maliki: Context-dependent
- Hanbali: Similar to Jumhur

**Implementation:** Must calculate all 3 methods, pick best for grandfather

---

## ⛔ PENGHALANG WARIS (8 Mawani)

### 1. Pembunuhan (القتل)
**Rule:** Pembunuh tidak mewarisi dari yang dibunuh
**Dalil:** "ليس للقاتل ميراث" (HR. Abu Dawud, Ibn Majah)
**Details:**
- Sengaja (intentional murder): BLOCKS completely
- Tidak sengaja (manslaughter): Scholars differ
- Self-defense: Does NOT block

### 2. Perbedaan Agama (اختلاف الدين)
**Rule:** Muslim tidak mewarisi dari non-Muslim, vice versa
**Dalil:** "لا يرث المسلم الكافر ولا الكافر المسلم" (HR. Bukhari, Muslim)
**Details:**
- Muslim → Non-Muslim: ❌ No inheritance
- Non-Muslim → Muslim: ❌ No inheritance
- Murtad (apostate): Loses inheritance rights

### 3. Perbudakan (الرق)
**Rule:** Slave cannot inherit (historical, no longer applicable)
**Context:** Included for fiqih education only

### 4. Murtad (الردة)
**Rule:** Apostate loses all inheritance rights
**Details:** Wealth goes to Baitul Mal (Islamic treasury)

### 5. Li'an (اللعان)
**Rule:** Child from li'an case doesn't inherit from father
**Dalil:** Hadits about Hilal ibn Umayyah
**Details:** Child still inherits from mother's side

### 6. Anak Zina (ولد الزنا)
**Rule:** Illegitimate child ONLY inherits from mother, NOT father
**Dalil:** "الولد للفراش وللعاهر الحجر" (HR. Bukhari, Muslim)
**Critical:** Must show warning modal before calculation!

### 7. Anak Angkat (التبني)
**Rule:** Adopted child does NOT inherit
**Dalil:** Al-Ahzab 4-5 (Quran)
**Alternative:** Can receive through wasiat (max 1/3)
**Critical:** Must show warning modal before calculation!

### 8. Anak Susuan (الرضاع)
**Rule:** Radha'ah relationship does NOT create inheritance
**Dalil:** "يحرم من الرضاع ما يحرم من النسب" (marriage prohibition only)
**Context:** Educational content only, does NOT block inheritance

---

## 📚 EDUCATION CONTENT (8 Bab)

### Bab 1: Pengantar Ilmu Faraidh
- Definisi faraidh
- Kedudukan ilmu faraidh dalam Islam
- Keutamaan mempelajari faraidh
- Dalil wajib belajar faraidh

### Bab 2: Rukun, Syarat, Sebab Waris
**3 Rukun:**
1. Muwarrits (الموِّرث) - Yang mewariskan (pewaris)
2. Warits (الوارث) - Yang mewarisi (ahli waris)
3. Mauruts (الموروث) - Yang diwariskan (harta)

**3 Syarat:**
1. Matinya muwarrits (hakiki atau hukmi)
2. Hidupnya ahli waris (saat pewaris meninggal)
3. Tidak ada penghalang waris (8 mawani)

**3 Sebab:**
1. Nasab (kekerabatan)
2. Nikah (pernikahan yang sah)
3. Wala' (memerdekakan budak) - historis

### Bab 3: Ashabul Furudh
**12 Ahli Waris dengan Bagian Tetap:**
1. Suami: 1/2 atau 1/4
2. Istri: 1/4 atau 1/8
3. Ayah: 1/6 atau ashabah
4. Ibu: 1/3, 1/6, atau 1/3 sisa
5. Kakek: 1/6 atau ashabah atau muqasamah
6. Nenek: 1/6
7. Anak perempuan: 1/2, 2/3, atau ashabah
8. Cucu perempuan: 1/2, 2/3, 1/6, atau ashabah
9. Saudara perempuan kandung: 1/2, 2/3, atau ashabah
10. Saudara perempuan seayah: 1/2, 2/3, 1/6, atau ashabah
11. Saudara laki-laki seibu: 1/6
12. Saudara perempuan seibu: 1/6

### Bab 4: Ashabah (العصبة)
**3 Jenis:**
1. Ashabah bi nafsihi (عصبة بالنفس) - Ashabah sendiri
2. Ashabah bi ghairihi (عصبة بالغير) - Ashabah karena orang lain
3. Ashabah ma'a ghairihi (عصبة مع الغير) - Ashabah bersama orang lain

**Urutan Ashabah:**
Mengikuti sistem ta'shib (أقرب فأقرب - yang lebih dekat)

### Bab 5: Gugurnya Ahli Waris
Detail 8 penghalang waris (sudah dijelaskan di atas)

### Bab 6: Aul, Radd, Hijab
Detail perhitungan (sudah dijelaskan di atas)

### Bab 7: Wasiat & Batasannya
**Rules:**
- Maximum 1/3 dari harta
- Tidak boleh untuk ahli waris (kecuali disetujui ahli waris lain)
- Harus dibayar setelah hutang
**Dalil:** "الثلث والثلث كثير" (HR. Bukhari, Muslim)

### Bab 8: Harta Bersama (Gono-Gini)
**Context:** Hukum Indonesia (bukan murni fiqih Islam)
**Education:** Jelaskan harus dipisahkan dulu sebelum dibagi waris

---

## 🔧 TECHNICAL SPECIFICATIONS

### Tech Stack
```
Frontend: HTML5, CSS3, Vanilla JavaScript
Libraries: Fraction.js, jsPDF, html2canvas
Data: 68 JSON files (modular architecture)
Platform: PWA (Progressive Web App)
Deployment: Netlify (auto-deploy)
```

### Browser Support
```
Chrome 90+
Firefox 88+
Safari 14+
Edge 90+
Mobile browsers (iOS Safari 14+, Chrome Android 90+)
```

### Performance Targets
```
Initial Load: < 3 seconds (4G)
Time to Interactive: < 5 seconds
Lighthouse Score: > 90 (all categories)
Bundle Size: < 5 MB
```

### File Organization
```
- Modular: Each feature in separate file
- Lazy Loading: Load data on-demand
- No Bundler: Vanilla JS for simplicity
- No Framework: For size optimization
```

---

## 🚫 EXPLICITLY OUT OF SCOPE

```
❌ User authentication/login system
❌ Database storage (all client-side)
❌ Excel export (requirement removed)
❌ Direct consultation with ulama
❌ Zakat/infaq calculator
❌ Wasiat calculation (education only)
❌ Hutang calculation (education only)
❌ Multiple currencies (show without symbol)
❌ TypeScript (vanilla JS only)
❌ Build tools/webpack (keep simple)
```

---

## ✅ ACCEPTANCE CRITERIA

### Phase 1 (Core Calculator) - Target: 2 weeks
- [ ] Calculator can handle 4 primary heirs (father, mother, son, daughter)
- [ ] Results show as fractions (not decimals)
- [ ] Basic validation working
- [ ] Responsive on mobile & desktop

### Phase 2 (Education & Dalil) - Target: 2 weeks
- [ ] 8 bab education accessible
- [ ] 10 Quran dalil with Arabic + translations
- [ ] 10 Hadith dalil with references
- [ ] Modal dalil viewer working

### Phase 3 (Multi-Mazhab) - Target: 2 weeks
- [ ] 5 mazhab selectable
- [ ] Comparison mode working
- [ ] Aul, Radd, Hijab detected automatically
- [ ] Complex cases handled

### Phase 4 (PWA & Export) - Target: 1 week
- [ ] App works offline
- [ ] "Add to Home Screen" functional
- [ ] PDF export with dalil
- [ ] Print layout optimized

### Phase 5 (Polish) - Target: 1 week
- [ ] Quiz working (3 levels)
- [ ] All 68 JSON files complete
- [ ] Documentation complete
- [ ] Zero critical bugs

---

## 📖 REFERENCE MATERIALS

### Kitab Fiqih (Minimum 100+ references needed)
**Hanafi:**
- Al-Hidayah - Al-Marghinani
- Fath al-Qadir - Ibn Humam
- Radd al-Muhtar - Ibn Abidin

**Maliki:**
- Al-Mudawwanah - Imam Malik
- Bidayah al-Mujtahid - Ibn Rushd
- Al-Kafi - Ibn Abd al-Barr

**Syafi'i:**
- Al-Umm - Imam Syafi'i
- Minhaj at-Talibin - An-Nawawi
- Nihayah al-Muhtaj - Ar-Ramli

**Hanbali:**
- Al-Mughni - Ibn Qudamah
- Zad al-Mustaqni' - Al-Hajjawi
- Kashshaf al-Qina' - Al-Bahuti

**Tafsir:**
- Tafsir Al-Qurtubi
- Tafsir Ibn Katsir
- Tafsir At-Thabari

**Hadits:**
- Sahih Bukhari
- Sahih Muslim
- Sunan Abu Dawud
- Sunan Ibn Majah

---

## 🎯 CRITICAL SUCCESS FACTORS

1. **Accuracy First:** Calculation must be 100% correct
2. **Dalil Always:** Never show result without dalil
3. **User Education:** Not just calculator, but learning tool
4. **Respect Khilafiyah:** Present differences, let user choose
5. **Mobile-First:** Most users will access via smartphone

---

**Last Updated:** 2026-01-03  
**Document Version:** 1.0  
**Total Project Files:** 124  
**Current Progress:** 16%

---

**AI: After reading this, proceed to STATUS.json to know current state!**
