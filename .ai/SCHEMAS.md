# 📋 DATA SCHEMAS & VALIDATION RULES

**AI, gunakan schemas ini untuk memastikan data JSON yang Anda buat VALID!**

---

## 🎯 OVERVIEW

Semua data JSON HARUS follow schema yang didefinisikan di sini. Sebelum commit, VALIDATE file Anda dengan schema ini.

---

## 📦 HEIR DATA SCHEMA

### **File Location:** `data/heirs/primary/*.json`, `data/heirs/extended/*.json`

### **JSON Schema:**
```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "type": "object",
  "required": ["id", "name", "category", "type", "shares", "dalil"],
  "properties": {
    "id": {
      "type": "string",
      "pattern": "^[a-z_]+$",
      "description": "Unique identifier (lowercase with underscores)"
    },
    "name": {
      "type": "object",
      "required": ["ar", "id", "en"],
      "properties": {
        "ar": { "type": "string", "description": "Arabic name" },
        "id": { "type": "string", "description": "Indonesian name" },
        "en": { "type": "string", "description": "English name" }
      }
    },
    "category": {
      "type": "string",
      "enum": ["primary", "extended", "dzawil_arham"]
    },
    "type": {
      "type": "string",
      "enum": ["ashabul_furudh", "ashabah", "both", "dzawil_arham"]
    },
    "shares": {
      "type": "object",
      "required": ["jumhur", "hanafi", "maliki", "shafii", "hanbali"],
      "description": "Shares for each mazhab"
    },
    "dalil": {
      "type": "array",
      "items": { "type": "string" },
      "description": "Array of dalil IDs (references to data/dalil/)"
    },
    "blocks": {
      "type": "array",
      "items": { "type": "string" },
      "description": "Array of heir IDs this heir blocks"
    },
    "blocked_by": {
      "type": "array",
      "items": { "type": "string" },
      "description": "Array of heir IDs that block this heir"
    }
  }
}
```

### **COMPLETE EXAMPLE: father.json**
```json
{
  "id": "father",
  "name": {
    "ar": "الأب",
    "id": "Ayah",
    "en": "Father"
  },
  "category": "primary",
  "type": "both",
  "shares": {
    "jumhur": {
      "conditions": [
        {
          "if": "has_male_children",
          "share": "1/6",
          "type": "fardh",
          "dalil": ["an-nisa-11"],
          "explanation": {
            "ar": "للأب السدس فرضاً مع وجود الفرع الوارث الذكر",
            "id": "Ayah mendapat 1/6 sebagai fardh jika ada anak laki-laki yang mewarisi",
            "en": "Father receives 1/6 as fardh when there is a male child who inherits"
          }
        },
        {
          "if": "no_children",
          "share": "residue",
          "type": "ashabah",
          "dalil": ["hadith-ashabah"],
          "explanation": {
            "ar": "الأب عصبة بنفسه إذا لم يكن للميت فرع وارث",
            "id": "Ayah adalah ashabah bi nafsihi jika pewaris tidak memiliki anak yang mewarisi",
            "en": "Father is ashabah bi nafsihi when deceased has no inheriting children"
          }
        },
        {
          "if": "has_female_children_only",
          "share": "1/6_plus_residue",
          "type": "fardh_and_ashabah",
          "dalil": ["an-nisa-11"],
          "explanation": {
            "ar": "للأب السدس فرضاً والباقي تعصيباً مع البنات",
            "id": "Ayah mendapat 1/6 fardh plus sisa sebagai ashabah bersama anak perempuan",
            "en": "Father receives 1/6 fardh plus residue as ashabah with daughters"
          }
        }
      ]
    },
    "hanafi": {
      "note": "Same as Jumhur",
      "reference": "jumhur"
    },
    "maliki": {
      "note": "Same as Jumhur",
      "reference": "jumhur"
    },
    "shafii": {
      "note": "Same as Jumhur",
      "reference": "jumhur"
    },
    "hanbali": {
      "note": "Same as Jumhur",
      "reference": "jumhur"
    }
  },
  "dalil": ["an-nisa-11", "hadith-ashabah"],
  "blocks": ["grandfather", "uncle_paternal", "brother_full", "brother_paternal"],
  "blocked_by": [],
  "notes": {
    "ar": "الأب من أصحاب الفروض والعصبات، وهو من العصبة بالنفس",
    "id": "Ayah termasuk ashabul furudh dan ashabah. Ia adalah ashabah bi nafsihi yang tidak terhalang oleh siapapun.",
    "en": "Father is both ashabul furudh and ashabah. He is ashabah bi nafsihi who cannot be blocked by anyone."
  }
}
```

---

## 📖 DALIL DATA SCHEMA

### **File Location:** `data/dalil/quran/*.json`, `data/dalil/hadith/*.json`, `data/dalil/atsar/*.json`

### **JSON Schema:**
```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "type": "object",
  "required": ["id", "type", "arabic", "translation", "references"],
  "properties": {
    "id": { "type": "string" },
    "type": { "enum": ["quran", "hadith", "atsar"] },
    "arabic": { "type": "string", "description": "Arabic text with tashkeel" },
    "translation": {
      "type": "object",
      "required": ["id", "en"],
      "properties": {
        "id": { "type": "string" },
        "en": { "type": "string" }
      }
    },
    "references": {
      "type": "array",
      "items": {
        "type": "object",
        "required": ["book", "author"],
        "properties": {
          "book": {
            "type": "object",
            "required": ["ar", "id", "en"]
          },
          "author": { "type": "string" },
          "volume": { "type": ["number", "string"] },
          "page": { "type": ["number", "string"] }
        }
      }
    }
  }
}
```

### **COMPLETE EXAMPLE: an-nisa-11.json**
```json
{
  "id": "an-nisa-11",
  "type": "quran",
  "surah": {
    "name": "An-Nisa",
    "number": 4,
    "arabic": "النساء"
  },
  "ayat": 11,
  "arabic": "يُوصِيكُمُ اللَّهُ فِي أَوْلَادِكُمْ ۖ لِلذَّكَرِ مِثْلُ حَظِّ الْأُنْثَيَيْنِ ۚ فَإِن كُنَّ نِسَاءً فَوْقَ اثْنَتَيْنِ فَلَهُنَّ ثُلُثَا مَا تَرَكَ ۖ وَإِن كَانَتْ وَاحِدَةً فَلَهَا النِّصْفُ ۚ وَلِأَبَوَيْهِ لِكُلِّ وَاحِدٍ مِّنْهُمَا السُّدُسُ مِمَّا تَرَكَ إِن كَانَ لَهُ وَلَدٌ ۚ فَإِن لَّمْ يَكُن لَّهُ وَلَدٌ وَوَرِثَهُ أَبَوَاهُ فَلِأُمِّهِ الثُّلُثُ",
  "translation": {
    "id": "Allah mensyariatkan (mewajibkan) kepadamu tentang (pembagian warisan untuk) anak-anakmu, (yaitu) bagian seorang anak laki-laki sama dengan bagian dua orang anak perempuan. Dan jika anak itu semuanya perempuan yang jumlahnya lebih dari dua, maka bagian mereka dua pertiga dari harta yang ditinggalkan. Jika dia (anak perempuan) itu seorang saja, maka dia memperoleh setengah (harta yang ditinggalkan). Dan untuk kedua ibu-bapak, bagian masing-masing seperenam dari harta yang ditinggalkan, jika dia (yang meninggal) mempunyai anak. Jika dia (yang meninggal) tidak mempunyai anak dan dia diwarisi oleh kedua ibu-bapaknya (saja), maka ibunya mendapat sepertiga.",
    "en": "Allah instructs you concerning your children: for the male, what is equal to the share of two females. But if there are [only] daughters, two or more, for them is two thirds of one's estate. And if there is only one, for her is half. And for one's parents, to each one of them is a sixth of his estate if he left children. But if he had no children and the parents [alone] inherit from him, then for his mother is one third."
  },
  "tafsir": {
    "id": "Ayat ini adalah ayat pokok dalam hukum waris Islam. Allah SWT menetapkan bagian anak laki-laki dua kali lipat dari anak perempuan dengan hikmah: anak laki-laki berkewajiban menafkahi keluarga, sedangkan anak perempuan akan menerima mahar dan nafkah dari suami. Ayat ini juga menetapkan bagian orang tua: 1/6 jika ada anak, dan 1/3 untuk ibu jika tidak ada anak.",
    "en": "This is the primary verse in Islamic inheritance law. Allah SWT establishes that a son receives twice the share of a daughter with wisdom: sons are obligated to provide for families, while daughters will receive dowry and maintenance from husbands. This verse also establishes parents' shares: 1/6 if there are children, and 1/3 for mother if no children."
  },
  "references": [
    {
      "book": {
        "ar": "تفسير القرطبي",
        "id": "Tafsir Al-Qurtubi",
        "en": "Tafsir Al-Qurtubi"
      },
      "author": "Al-Qurtubi",
      "full_name": "Abu Abdullah Muhammad bin Ahmad Al-Anshari Al-Qurtubi",
      "volume": 5,
      "page": "47-89"
    },
    {
      "book": {
        "ar": "تفسير ابن كثير",
        "id": "Tafsir Ibnu Katsir",
        "en": "Tafsir Ibn Kathir"
      },
      "author": "Ibn Kathir",
      "full_name": "Imad ad-Din Ismail bin Umar bin Kathir",
      "volume": 2,
      "page": "201-215"
    },
    {
      "book": {
        "ar": "أحكام القرآن للجصاص",
        "id": "Ahkam Al-Quran - Al-Jassas",
        "en": "Ahkam Al-Quran by Al-Jassas"
      },
      "author": "Al-Jassas",
      "full_name": "Ahmad bin Ali Abu Bakr Ar-Razi Al-Jassas",
      "volume": 2,
      "page": "112-130"
    }
  ],
  "related_heirs": ["son", "daughter", "father", "mother"],
  "related_rules": ["fardh", "2to1_ratio", "two_thirds_rule"],
  "tags": ["waris", "anak", "orang_tua", "fardh", "ashabul_furudh"]
}
```

---

## 🕌 MAZHAB DATA SCHEMA

### **File Location:** `data/mazhab/*.json`

### **COMPLETE EXAMPLE: shafii.json**
```json
{
  "id": "shafii",
  "name": {
    "ar": "المذهب الشافعي",
    "id": "Mazhab Syafi'i",
    "en": "Shafi'i School of Jurisprudence"
  },
  "founder": {
    "name": "Muhammad bin Idris asy-Syafi'i",
    "arabic": "محمد بن إدريس الشافعي",
    "birth": "150 H / 767 M",
    "death": "204 H / 820 M",
    "birthplace": "Gaza, Palestine"
  },
  "description": {
    "id": "Mazhab Syafi'i adalah salah satu dari empat mazhab besar dalam Islam Sunni, didirikan oleh Imam Muhammad bin Idris asy-Syafi'i. Mazhab ini dikenal dengan metodologi yang seimbang antara hadits dan ra'yu (ijtihad), serta mengutamakan keshahihan hadits dalam penetapan hukum.",
    "en": "The Shafi'i school is one of the four major Sunni schools of Islamic jurisprudence, founded by Imam Muhammad bin Idris al-Shafi'i. It is known for its balanced methodology between hadith and ra'yu (ijtihad), prioritizing authentic hadith in legal rulings."
  },
  "key_principles": [
    {
      "ar": "القرآن الكريم",
      "id": "Al-Qur'an Al-Karim sebagai sumber hukum pertama",
      "en": "The Noble Quran as the first source of law"
    },
    {
      "ar": "السنة النبوية",
      "id": "Sunnah Nabi sebagai sumber kedua, mengutamakan hadits shahih",
      "en": "Prophetic Sunnah as second source, prioritizing authentic hadith"
    },
    {
      "ar": "الإجماع",
      "id": "Ijma' (konsensus ulama)",
      "en": "Ijma' (scholarly consensus)"
    },
    {
      "ar": "القياس",
      "id": "Qiyas (analogi hukum)",
      "en": "Qiyas (legal analogy)"
    }
  ],
  "differences_from_jumhur": [
    {
      "issue": "granddaughter_with_two_daughters",
      "case": {
        "id": "Pewaris meninggalkan 2 anak perempuan dan 1 cucu perempuan (dari anak laki-laki)",
        "en": "Deceased left 2 daughters and 1 granddaughter (from son)"
      },
      "jumhur": {
        "ruling": "Cucu perempuan TIDAK MENDAPAT bagian (mahjub/terhalang)",
        "share": "0",
        "reason": {
          "id": "Dua anak perempuan telah mengambil maximum share (2/3), sehingga cucu perempuan terhalang",
          "en": "Two daughters have taken the maximum share (2/3), thus granddaughter is blocked"
        }
      },
      "shafii": {
        "ruling": "Cucu perempuan MENDAPAT 1/6 (tasybih dengan nenek)",
        "share": "1/6",
        "reason": {
          "id": "Cucu perempuan mendapat 1/6 untuk menyempurnakan 2/3 (prinsip tasybih dengan nenek yang dapat 1/6 bersama ibu)",
          "en": "Granddaughter receives 1/6 to complete 2/3 (principle of analogy with grandmother who receives 1/6 alongside mother)"
        },
        "dalil": ["hadith-zaid-granddaughter"]
      },
      "calculation_example": {
        "jumhur": {
          "daughters_2": "2/3",
          "granddaughter": "0 (blocked)",
          "total": "2/3"
        },
        "shafii": {
          "daughters_2": "2/3",
          "granddaughter": "1/6",
          "total": "2/3 + 1/6 = 5/6"
        }
      }
    },
    {
      "issue": "grandfather_with_siblings",
      "case": {
        "id": "Pewaris meninggalkan kakek dan saudara kandung",
        "en": "Deceased left grandfather and full siblings"
      },
      "jumhur": {
        "ruling": "Kakek menghalangi saudara kandung (hijab)",
        "reason": {
          "id": "Kakek menempati posisi ayah, sehingga menghalangi saudara",
          "en": "Grandfather takes father's position, thus blocks siblings"
        }
      },
      "shafii": {
        "ruling": "Muqasamah - kakek berbagi dengan saudara",
        "calculation": "Kakek diperlakukan sebagai saudara laki-laki, berbagi dengan sistem 'ashabah",
        "dalil": ["atsar-zaid-muqasamah"]
      }
    }
  ],
  "books": [
    {
      "title": {
        "ar": "الأم",
        "id": "Al-Umm",
        "en": "Al-Umm"
      },
      "author": "Imam Syafi'i",
      "description": "Kitab induk mazhab Syafi'i"
    },
    {
      "title": {
        "ar": "المنهاج",
        "id": "Minhaj at-Talibin",
        "en": "Minhaj at-Talibin"
      },
      "author": "Imam Nawawi",
      "description": "Referensi utama mazhab Syafi'i"
    }
  ],
  "prevalence": {
    "regions": ["Indonesia", "Malaysia", "Brunei", "Southern Thailand", "Philippines (Muslim areas)", "East Africa", "Yemen", "Parts of Egypt and Jordan"],
    "notes": {
      "id": "Mazhab Syafi'i adalah mazhab mayoritas di Indonesia dan Asia Tenggara",
      "en": "Shafi'i school is the majority school in Indonesia and Southeast Asia"
    }
  }
}
```

---

## ⚖️ CALCULATION RULES SCHEMAS

### **Aul (Increase Denominator) - EXACT ALGORITHM**

```javascript
/**
 * Aul Detection and Calculation
 * References: Atsar Umar RA, Kitab Fiqh al-Mawaris
 */

function detectAul(shares) {
  // Step 1: Convert all fardh shares to common denominator
  const fractions = shares.map(s => new Fraction(s.share));
  const sum = fractions.reduce((a, b) => a.add(b), new Fraction(0));

  // Step 2: Check if sum > 1
  if (sum.compare(1) > 0) {
    // Aul detected!
    return {
      hasAul: true,
      originalDenominator: sum.d,  // Original denominator
      newDenominator: sum.n,        // New denominator after aul
      excess: sum.sub(1)            // How much it exceeds
    };
  }

  return { hasAul: false };
}

/**
 * Example Case - Umariyyah Al-Ula (First Umar Case)
 * 
 * Heirs:
 * - Husband: 1/2
 * - Mother: 1/3
 * - Sister: 1/2
 * 
 * Calculation:
 * Sum = 1/2 + 1/3 + 1/2 = 3/6 + 2/6 + 3/6 = 8/6 (exceeds!)
 * 
 * Apply Aul:
 * Original denominator: 6
 * New denominator: 8
 * 
 * New shares:
 * - Husband: 3/8 (was 3/6)
 * - Mother: 2/8 (was 2/6)
 * - Sister: 3/8 (was 3/6)
 * Total: 8/8 = 1 ✓
 */
```

### **Radd (Return Surplus) - EXACT ALGORITHM**

```javascript
/**
 * Radd Detection and Calculation
 * References: Majority opinion, excluding Zaid bin Thabit
 */

function detectRadd(shares, hasAshabah) {
  // Step 1: Sum all fardh shares
  const fractions = shares.filter(s => s.type === 'fardh')
                          .map(s => new Fraction(s.share));
  const sum = fractions.reduce((a, b) => a.add(b), new Fraction(0));

  // Step 2: Check if sum < 1 AND no ashabah
  if (sum.compare(1) < 0 && !hasAshabah) {
    return {
      hasRadd: true,
      surplus: new Fraction(1).sub(sum),  // Surplus to be returned
      beneficiaries: shares.filter(s => s.eligible_for_radd)
    };
  }

  return { hasRadd: false };
}

/**
 * Example Case - Radd
 * 
 * Heirs:
 * - Wife: 1/4
 * - Mother: 1/3
 * - No ashabah
 * 
 * Calculation:
 * Sum = 1/4 + 1/3 = 3/12 + 4/12 = 7/12 (surplus: 5/12)
 * 
 * Note: Wife does NOT receive radd (spouse excluded)
 * Radd goes to: Mother only
 * 
 * Apply Radd:
 * - Wife: 1/4 (remains)
 * - Mother: 1/3 + 5/12 (radd) = 4/12 + 5/12 = 9/12 = 3/4
 * 
 * Verification: 1/4 + 3/4 = 1 ✓
 */
```

### **Hijab (Blocking) Rules**

```json
{
  "hijab_rules": {
    "father_blocks": [
      "grandfather",
      "uncle_paternal",
      "cousin_paternal",
      "nephew_brother",
      "great_grandfather"
    ],
    "son_blocks": [
      "grandson_son",
      "brother_full",
      "brother_paternal",
      "uncle_paternal",
      "nephew_brother"
    ],
    "grandfather_blocks": [
      "brother_full (in Jumhur, not in some Shafi'i cases)",
      "brother_paternal",
      "uncle_paternal"
    ],
    "daughter_partial_block": {
      "blocks": ["granddaughter_son"],
      "condition": "if 2+ daughters exist",
      "exception_shafii": "Granddaughter receives 1/6 to complete 2/3"
    }
  }
}
```

---

## ⛔ MAWANI (PENGHALANG WARIS) SCHEMAS

### **Complete Example: murder.json**

```json
{
  "id": "murder",
  "name": {
    "ar": "القتل",
    "id": "Pembunuhan",
    "en": "Murder/Homicide"
  },
  "ruling": "Pembunuh TIDAK MEWARISI dari korban",
  "dalil": [
    {
      "type": "hadith",
      "arabic": "لَيْسَ لِلْقَاتِلِ مِيرَاثٌ",
      "translation": {
        "id": "Tidak ada warisan bagi pembunuh",
        "en": "There is no inheritance for the killer"
      },
      "source": "Sunan Abu Dawud, Hadith No. 2872",
      "grade": "Hasan",
      "narrator": "Abu Hurairah RA"
    },
    {
      "type": "atsar",
      "arabic": "من قتل قتيلاً فإنه لا يرثه",
      "translation": {
        "id": "Barangsiapa membunuh seseorang, maka ia tidak mewarisi darinya",
        "en": "Whoever kills someone, he does not inherit from him"
      },
      "source": "Atsar Umar bin Khattab RA"
    }
  ],
  "types_of_killing": {
    "direct_intentional": {
      "ar": "القتل العمد المباشر",
      "id": "Pembunuhan sengaja langsung",
      "ruling": "Menghalangi waris (IJMA')",
      "all_mazhabs_agree": true
    },
    "quasi_intentional": {
      "ar": "القتل شبه العمد",
      "id": "Pembunuhan semi-sengaja",
      "ruling": "Menghalangi waris (Jumhur)",
      "hanafi": "Menghalangi",
      "shafii": "Menghalangi",
      "maliki": "Menghalangi",
      "hanbali": "Menghalangi"
    },
    "accidental": {
      "ar": "القتل الخطأ",
      "id": "Pembunuhan tidak sengaja/khilaf",
      "ruling": "BERBEDA PENDAPAT",
      "jumhur": "Menghalangi waris",
      "maliki_minority": "TIDAK menghalangi (jika benar-benar khilaf)",
      "note": {
        "id": "Jumhur berpendapat pembunuhan khilaf tetap menghalangi untuk mencegah manipulasi",
        "en": "Majority opinion: accidental killing still blocks inheritance to prevent manipulation"
      }
    },
    "indirect_causation": {
      "ar": "القتل بالتسبب",
      "id": "Pembunuhan tidak langsung (menyebabkan kematian)",
      "ruling": "BERBEDA PENDAPAT",
      "example": "Menggali lubang yang menyebabkan orang jatuh dan meninggal",
      "jumhur": "TIDAK menghalangi (bukan pembunuhan langsung)",
      "some_hanafi": "Menghalangi"
    },
    "legal_execution": {
      "ar": "القتل القصاص أو الحد",
      "id": "Eksekusi hukuman qisas atau hudud",
      "ruling": "TIDAK menghalangi waris",
      "reason": {
        "id": "Ini adalah eksekusi hukum yang sah, bukan pembunuhan",
        "en": "This is lawful execution, not murder"
      }
    }
  },
  "wisdom": {
    "ar": "من تعجل الشيء قبل أوانه عوقب بحرمانه",
    "id": "Barangsiapa mempercepat sesuatu sebelum waktunya, dibalas dengan kehilangan haknya",
    "en": "Whoever hastens something before its time is punished by being deprived of it",
    "explanation": {
      "id": "Hikmah pengharaman ini adalah untuk menutup pintu kejahatan (sadd adz-dzari'ah) agar tidak ada yang membunuh kerabatnya untuk mendapat warisan lebih cepat.",
      "en": "The wisdom is to close the door to evil (sadd adz-dzari'ah) so no one kills their relative to receive inheritance sooner."
    }
  }
}
```

---

## 📚 EDUCATION CONTENT SCHEMA

### **Example: gugurnya-ahli-waris.json (8 Penghalang)**

```json
{
  "id": "gugurnya-ahli-waris",
  "title": {
    "ar": "موانع الإرث",
    "id": "Penghalang Waris",
    "en": "Barriers to Inheritance"
  },
  "introduction": {
    "id": "Ada 8 hal yang menyebabkan seseorang tidak bisa mewarisi meskipun memiliki hubungan kerabat dengan pewaris. Kedelapan penghalang ini wajib dipahami untuk memastikan pembagian waris yang benar sesuai syariat.",
    "en": "There are 8 things that prevent someone from inheriting even though they have a family relationship with the deceased. These eight barriers must be understood to ensure correct inheritance distribution according to Islamic law."
  },
  "barriers": [
    {
      "no": 1,
      "name": {
        "ar": "القتل",
        "id": "Pembunuhan",
        "en": "Murder/Homicide"
      },
      "summary": "Pembunuh tidak mewarisi dari korban",
      "detail_ref": "data/mawani/murder.json",
      "dalil_primary": "hadith-la-yarith-qatil",
      "severity": "critical",
      "ijma": true
    },
    {
      "no": 2,
      "name": {
        "ar": "اختلاف الدين",
        "id": "Perbedaan Agama",
        "en": "Difference in Religion"
      },
      "summary": "Muslim tidak mewarisi dari non-Muslim, dan sebaliknya",
      "detail_ref": "data/mawani/religion.json",
      "dalil_primary": "hadith-la-yarith-muslim",
      "severity": "critical",
      "ijma": true
    },
    {
      "no": 3,
      "name": {
        "ar": "الرق",
        "id": "Perbudakan",
        "en": "Slavery"
      },
      "summary": "Budak tidak mewarisi (konteks historis)",
      "detail_ref": "data/mawani/slavery.json",
      "note": "Hanya relevan secara historis, tidak berlaku di era modern",
      "severity": "historical",
      "ijma": true
    },
    {
      "no": 4,
      "name": {
        "ar": "الردة",
        "id": "Murtad (Keluar dari Islam)",
        "en": "Apostasy"
      },
      "summary": "Orang murtad tidak mewarisi dan tidak diwarisi",
      "detail_ref": "data/mawani/apostasy.json",
      "severity": "critical",
      "ijma": true
    },
    {
      "no": 5,
      "name": {
        "ar": "اللعان",
        "id": "Li'an (Sumpah Laknat)",
        "en": "Li'an (Mutual Cursing)"
      },
      "summary": "Anak hasil li'an tidak mewarisi dari ayah (hanya dari ibu)",
      "detail_ref": "data/mawani/illegitimate.json",
      "section": "lian",
      "severity": "high"
    },
    {
      "no": 6,
      "name": {
        "ar": "ولد الزنا",
        "id": "Anak Zina",
        "en": "Illegitimate Child"
      },
      "summary": "Anak zina tidak mewarisi dari ayah biologis (hanya dari ibu)",
      "detail_ref": "data/mawani/illegitimate.json",
      "section": "zina",
      "dalil_primary": "hadith-walad-lil-firash",
      "severity": "critical",
      "ijma": true,
      "note": "⚠️ PENTING: Modal warning harus muncul untuk edukasi user"
    },
    {
      "no": 7,
      "name": {
        "ar": "التبني",
        "id": "Anak Angkat",
        "en": "Adopted Child"
      },
      "summary": "Anak angkat TIDAK mewarisi dari orang tua angkat",
      "detail_ref": "data/mawani/illegitimate.json",
      "section": "adoption",
      "dalil_primary": "al-ahzab-4-5",
      "severity": "critical",
      "ijma": true,
      "alternative": {
        "id": "Orang tua angkat dapat memberikan melalui WASIAT (max 1/3) atau HIBAH semasa hidup",
        "en": "Adoptive parents can give through WILL (max 1/3) or GIFT during lifetime"
      },
      "note": "⚠️ PENTING: Modal warning harus muncul untuk edukasi user"
    },
    {
      "no": 8,
      "name": {
        "ar": "الرضاع",
        "id": "Anak Susuan (Sepersusuan)",
        "en": "Milk Kinship"
      },
      "summary": "Anak susuan TIDAK mewarisi (berbeda dengan mahram nikah)",
      "detail_ref": "data/radha/inheritance_relation.json",
      "dalil_primary": "hadith-radha-yuharrim",
      "severity": "medium",
      "note": {
        "id": "Anak susuan haram dinikahi (mahram) TAPI TIDAK mewarisi. Ini edukasi saja, tidak masuk kalkulasi.",
        "en": "Milk siblings cannot marry (mahram) BUT DO NOT inherit. This is for education only, not in calculation."
      }
    }
  ],
  "modal_warning_trigger": {
    "when": "User clicks 'Hitung Sekarang' button",
    "before": "Loading/calculation starts",
    "content": "Warning about items 6, 7, 8 (zina, adoption, milk kinship)",
    "action": "User must acknowledge before proceeding"
  }
}
```

---

## ✅ VALIDATION CHECKLIST

### **Before Committing Any Data File:**

```markdown
## Heir Data Files
- [ ] JSON syntax valid (no trailing commas, proper quotes)
- [ ] All required fields present (id, name, category, type, shares, dalil)
- [ ] name.ar, name.id, name.en all filled
- [ ] shares object has all 5 mazhabs (jumhur, hanafi, maliki, shafii, hanbali)
- [ ] dalil array has at least 1 reference
- [ ] All dalil IDs exist in data/dalil/
- [ ] blocks/blocked_by arrays valid (heir IDs exist)
- [ ] File size within target (check TASKS.json constraints)

## Dalil Data Files
- [ ] JSON syntax valid
- [ ] Arabic text has proper tashkeel
- [ ] translation.id and translation.en both present
- [ ] references array has at least 1 book
- [ ] Each reference has: book.ar, book.id, book.en, author
- [ ] Page numbers specified (for verification)
- [ ] related_heirs array filled (linking to heirs)

## Mazhab Data Files
- [ ] All 5 mazhabs have consistent structure
- [ ] differences_from_jumhur documented with examples
- [ ] calculation_example shows exact shares
- [ ] dalil references valid

## Calculation Logic
- [ ] ALWAYS use Fraction.js (never decimals)
- [ ] Aul detection implemented correctly
- [ ] Radd detection implemented correctly
- [ ] Hijab rules enforced
- [ ] All conditions tested with examples
```

---

## 📏 SIZE CONSTRAINTS

```javascript
// Maximum file sizes (ENFORCE THESE!)
const MAX_SIZES = {
  // Heir files
  'data/heirs/primary/father.json': 65 * 1024,        // 65 KB
  'data/heirs/primary/mother.json': 62 * 1024,        // 62 KB
  'data/heirs/primary/grandfather.json': 85 * 1024,   // 85 KB (complex muqasamah)

  // Dalil files
  'data/dalil/quran/an-nisa-11.json': 30 * 1024,      // 30 KB
  'data/dalil/hadith/*.json': 18 * 1024,               // 18 KB each

  // Education files
  'data/education/gugurnya-ahli-waris.json': 60 * 1024, // 60 KB (8 barriers)

  // Total bundle target
  'TOTAL_APP': 5 * 1024 * 1024                         // 5 MB max
};
```

---

**END OF SCHEMAS.md**

*AI: Use these schemas as your CONTRACT when creating data files!*
