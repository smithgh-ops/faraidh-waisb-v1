#!/usr/bin/env node
/**
 * validate-data.js
 * Validates JSON data files against schemas
 * 
 * Usage: node scripts/validate-data.js --file=data/heirs/primary/father.json
 */

const fs = require('fs');
const path = require('path');

// Define valid share values according to Islamic inheritance law
const VALID_SHARES = [
  '1/2',   // Half
  '1/3',   // Third
  '1/4',   // Quarter
  '1/6',   // Sixth
  '1/8',   // Eighth
  '2/3',   // Two-thirds
  'residue', // Ashabah (remaining estate)
  '1/6_plus_residue', // Fardh + Ashabah
  'variable' // For complex cases like muqasamah
];

// Define required mazhabs
const REQUIRED_MAZHABS = ['jumhur', 'hanafi', 'maliki', 'shafii', 'hanbali'];

/**
 * Validate heir data file
 */
function validateHeirData(filePath) {
  console.log(`\n🔍 Validating: ${filePath}`);
  const errors = [];
  const warnings = [];

  try {
    // Read file
    const content = fs.readFileSync(filePath, 'utf-8');
    const data = JSON.parse(content);

    // 1. Check required fields
    if (!data.id) errors.push('❌ Missing required field: id');
    if (!data.name) errors.push('❌ Missing required field: name');
    if (!data.category) errors.push('❌ Missing required field: category');
    if (!data.shares) errors.push('❌ Missing required field: shares');

    // 2. Validate name structure
    if (data.name) {
      if (!data.name.ar) errors.push('❌ Missing name.ar (Arabic name)');
      if (!data.name.id) errors.push('❌ Missing name.id (Indonesian name)');
      if (!data.name.en) errors.push('❌ Missing name.en (English name)');
    }

    // 3. Validate shares per mazhab
    if (data.shares) {
      for (const mazhab of REQUIRED_MAZHABS) {
        if (!data.shares[mazhab]) {
          warnings.push(`⚠️  Missing shares for mazhab: ${mazhab}`);
        } else {
          // Validate conditions
          if (!data.shares[mazhab].conditions || !Array.isArray(data.shares[mazhab].conditions)) {
            errors.push(`❌ ${mazhab}: conditions must be an array`);
          } else {
            data.shares[mazhab].conditions.forEach((condition, idx) => {
              // Check required fields in condition
              if (!condition.if) errors.push(`❌ ${mazhab} condition ${idx}: missing 'if' field`);
              if (!condition.share) errors.push(`❌ ${mazhab} condition ${idx}: missing 'share' field`);
              if (!condition.type) errors.push(`❌ ${mazhab} condition ${idx}: missing 'type' field`);

              // Validate share value
              if (condition.share && !VALID_SHARES.includes(condition.share)) {
                errors.push(`❌ ${mazhab} condition ${idx}: invalid share value '${condition.share}'`);
              }
            });
          }
        }
      }
    }

    // 4. Validate dalil references
    if (data.dalil) {
      if (!Array.isArray(data.dalil)) {
        errors.push('❌ dalil must be an array');
      } else if (data.dalil.length === 0) {
        warnings.push('⚠️  No dalil references provided');
      }
    } else {
      warnings.push('⚠️  Missing dalil field');
    }

    // 5. Check file size
    const stats = fs.statSync(filePath);
    const sizeKB = Math.round(stats.size / 1024);
    console.log(`📏 File size: ${sizeKB} KB`);

    // Warn if too large (might impact performance)
    if (sizeKB > 100) {
      warnings.push(`⚠️  File size ${sizeKB} KB exceeds recommended 100 KB`);
    }

    // Print results
    console.log('\n📊 Validation Results:');
    if (errors.length === 0 && warnings.length === 0) {
      console.log('✅ PASSED - No issues found!');
      return true;
    }

    if (errors.length > 0) {
      console.log(`\n❌ FAILED - ${errors.length} error(s):`);
      errors.forEach(err => console.log(`   ${err}`));
    }

    if (warnings.length > 0) {
      console.log(`\n⚠️  ${warnings.length} warning(s):`);
      warnings.forEach(warn => console.log(`   ${warn}`));
    }

    return errors.length === 0;

  } catch (error) {
    console.error(`\n❌ ERROR: ${error.message}`);
    return false;
  }
}

/**
 * Validate dalil data file
 */
function validateDalilData(filePath) {
  console.log(`\n🔍 Validating: ${filePath}`);
  const errors = [];
  const warnings = [];

  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    const data = JSON.parse(content);

    // Required fields for dalil
    if (!data.id) errors.push('❌ Missing required field: id');
    if (!data.type) errors.push('❌ Missing required field: type');
    if (!data.arabic) errors.push('❌ Missing required field: arabic');
    if (!data.translation) errors.push('❌ Missing required field: translation');

    // Validate type
    const validTypes = ['quran', 'hadith', 'atsar'];
    if (data.type && !validTypes.includes(data.type)) {
      errors.push(`❌ Invalid type: ${data.type} (must be quran/hadith/atsar)`);
    }

    // Validate translation structure
    if (data.translation) {
      if (!data.translation.id) warnings.push('⚠️  Missing translation.id');
      if (!data.translation.en) warnings.push('⚠️  Missing translation.en');
    }

    // Check for references
    if (!data.references || data.references.length === 0) {
      warnings.push('⚠️  No kitab references provided');
    }

    // Print results
    console.log('\n📊 Validation Results:');
    if (errors.length === 0 && warnings.length === 0) {
      console.log('✅ PASSED - No issues found!');
      return true;
    }

    if (errors.length > 0) {
      console.log(`\n❌ FAILED - ${errors.length} error(s):`);
      errors.forEach(err => console.log(`   ${err}`));
    }

    if (warnings.length > 0) {
      console.log(`\n⚠️  ${warnings.length} warning(s):`);
      warnings.forEach(warn => console.log(`   ${warn}`));
    }

    return errors.length === 0;

  } catch (error) {
    console.error(`\n❌ ERROR: ${error.message}`);
    return false;
  }
}

// Main execution
const args = process.argv.slice(2);
const fileArg = args.find(arg => arg.startsWith('--file='));

if (!fileArg) {
  console.error('Usage: node scripts/validate-data.js --file=<path>');
  console.error('Example: node scripts/validate-data.js --file=data/heirs/primary/father.json');
  process.exit(1);
}

const filePath = fileArg.split('=')[1];

if (!fs.existsSync(filePath)) {
  console.error(`❌ File not found: ${filePath}`);
  process.exit(1);
}

// Determine file type and validate
let success = false;
if (filePath.includes('/heirs/')) {
  success = validateHeirData(filePath);
} else if (filePath.includes('/dalil/')) {
  success = validateDalilData(filePath);
} else {
  console.log('⚠️  Unknown file type - performing basic JSON validation only');
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    JSON.parse(content);
    console.log('✅ Valid JSON');
    success = true;
  } catch (error) {
    console.error(`❌ Invalid JSON: ${error.message}`);
    success = false;
  }
}

process.exit(success ? 0 : 1);
