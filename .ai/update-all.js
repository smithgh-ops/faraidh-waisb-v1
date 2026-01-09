#!/usr/bin/env node

/**
 * update-all.js
 * 
 * Atomic update script for Smart Brief JSON files
 * Ensures all-or-nothing updates with automatic rollback on failure
 * 
 * Usage:
 *   const { atomicUpdate } = require('./.ai/update-all.js');
 *   await atomicUpdate({
 *     'STATUS.json': { ... },
 *     'PROGRESS.json': { ... }
 *   });
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Color codes
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

/**
 * Atomic update function
 * @param {Object} changes - Object with filename: content pairs
 * @param {Object} options - Update options
 * @returns {Promise<boolean>} - Success status
 */
async function atomicUpdate(changes, options = {}) {
  const {
    validate = true,
    backup = true,
    verbose = true
  } = options;
  
  if (verbose) {
    log('\n' + '='.repeat(60), 'cyan');
    log('  🔄 ATOMIC UPDATE - Starting transaction...', 'cyan');
    log('='.repeat(60), 'cyan');
    log(`\n  Files to update: ${Object.keys(changes).length}`, 'blue');
    log(`  Validation: ${validate ? 'enabled' : 'disabled'}`, validate ? 'green' : 'yellow');
    log(`  Backup: ${backup ? 'enabled' : 'disabled'}`, backup ? 'green' : 'yellow');
  }
  
  const backups = {};
  const aiDir = path.join(__dirname);
  const updatedFiles = [];
  
  try {
    // STEP 1: Backup all files
    if (backup) {
      if (verbose) log('\n📦 Step 1: Creating backups...', 'blue');
      
      for (const filename of Object.keys(changes)) {
        const filepath = path.join(aiDir, filename);
        
        if (fs.existsSync(filepath)) {
          backups[filename] = fs.readFileSync(filepath, 'utf8');
          if (verbose) log(`  ✅ Backed up: ${filename}`, 'green');
        } else {
          if (verbose) log(`  ℹ️  New file (no backup needed): ${filename}`, 'cyan');
        }
      }
      
      if (verbose) log(`  📦 ${Object.keys(backups).length} file(s) backed up`, 'green');
    }
    
    // STEP 2: Write all changes
    if (verbose) log('\n✍️  Step 2: Writing updates...', 'blue');
    
    for (const [filename, content] of Object.entries(changes)) {
      const filepath = path.join(aiDir, filename);
      const jsonContent = typeof content === 'string' 
        ? content 
        : JSON.stringify(content, null, 2);
      
      fs.writeFileSync(filepath, jsonContent, 'utf8');
      updatedFiles.push(filename);
      if (verbose) log(`  ✅ Updated: ${filename}`, 'green');
    }
    
    if (verbose) log(`  ✍️  ${updatedFiles.length} file(s) updated`, 'green');
    
    // STEP 3: Validate consistency if requested
    if (validate) {
      if (verbose) log('\n🔍 Step 3: Validating consistency...', 'blue');
      
      try {
        const validationScript = path.join(aiDir, 'validate-consistency.js');
        const output = execSync(`node "${validationScript}"`, { 
          stdio: verbose ? 'inherit' : 'pipe',
          cwd: path.dirname(aiDir)
        });
        
        if (verbose) log('  ✅ Validation passed - all files consistent', 'green');
      } catch (error) {
        throw new Error(`Validation failed: ${error.message}`);
      }
    } else {
      if (verbose) log('\n⚠️  Step 3: Validation skipped', 'yellow');
    }
    
    // SUCCESS
    if (verbose) {
      log('\n' + '='.repeat(60), 'green');
      log('  ✅ ATOMIC UPDATE SUCCESSFUL', 'green');
      log('='.repeat(60), 'green');
      log('\n📊 Transaction Summary:', 'blue');
      log(`  - Files updated: ${updatedFiles.length}`, 'green');
      log(`  - Backups created: ${Object.keys(backups).length}`, 'green');
      log(`  - Validation: ${validate ? 'Passed ✅' : 'Skipped ⚠️'}`, validate ? 'green' : 'yellow');
      log(`  - Transaction: Committed ✅\n`, 'green');
    }
    
    return true;
    
  } catch (error) {
    // STEP 4: Rollback on any error
    log('\n' + '='.repeat(60), 'red');
    log('  ❌ UPDATE FAILED - Initiating rollback...', 'red');
    log('='.repeat(60), 'red');
    log(`\n  Error: ${error.message}`, 'red');
    
    if (Object.keys(backups).length === 0) {
      log('\n  ⚠️  No backups to restore (new files were created)', 'yellow');
      log('  Attempting to delete new files...', 'yellow');
      
      for (const filename of updatedFiles) {
        try {
          const filepath = path.join(aiDir, filename);
          if (fs.existsSync(filepath) && !backups[filename]) {
            fs.unlinkSync(filepath);
            log(`  ✅ Deleted: ${filename}`, 'green');
          }
        } catch (deleteError) {
          log(`  ❌ Failed to delete ${filename}: ${deleteError.message}`, 'red');
        }
      }
    } else {
      log('\n  🔄 Rolling back changes...', 'yellow');
      
      let rollbackSuccess = true;
      
      for (const [filename, backupContent] of Object.entries(backups)) {
        try {
          const filepath = path.join(aiDir, filename);
          fs.writeFileSync(filepath, backupContent, 'utf8');
          log(`  ✅ Restored: ${filename}`, 'green');
        } catch (rollbackError) {
          log(`  ❌ Failed to restore ${filename}: ${rollbackError.message}`, 'red');
          rollbackSuccess = false;
        }
      }
      
      if (rollbackSuccess) {
        log('\n  ✅ All changes rolled back successfully', 'green');
        log('  📊 System restored to previous state\n', 'green');
      } else {
        log('\n  ⚠️  Some files could not be restored!', 'yellow');
        log('  🚨 MANUAL INTERVENTION REQUIRED!', 'yellow');
        log('  Check file backups and restore manually\n', 'yellow');
      }
    }
    
    throw error;
  }
}

/**
 * Quick update helper for common task completion updates
 */
async function quickUpdate(taskId, updates, options = {}) {
  const timestamp = new Date().toISOString().replace('Z', '+07:00');
  const verbose = options.verbose !== false;
  
  if (verbose) {
    log(`\n🚀 Quick Update for: ${taskId}`, 'blue');
  }
  
  // Load current data
  const STATUS = loadJSON('STATUS.json');
  const PROGRESS = loadJSON('PROGRESS.json');
  
  const changes = {
    'STATUS.json': {
      ...STATUS,
      metadata: {
        ...STATUS.metadata,
        last_update: timestamp,
        updated_by: updates.updated_by || `Task ${taskId} completion`,
        update_method: 'automated'
      },
      active_task: updates.active_task !== undefined ? updates.active_task : STATUS.active_task,
      next_task: updates.next_task !== undefined ? updates.next_task : STATUS.next_task
    },
    'PROGRESS.json': {
      ...PROGRESS,
      last_update: timestamp,
      overall: {
        ...PROGRESS.overall,
        ...(updates.progress || {})
      }
    }
  };
  
  if (updates.blockers) {
    const BLOCKERS = loadJSON('BLOCKERS.json');
    changes['BLOCKERS.json'] = {
      ...BLOCKERS,
      last_update: timestamp,
      ...updates.blockers
    };
  }
  
  if (updates.tasks) {
    const TASKS = loadJSON('TASKS_FIXED.json');
    changes['TASKS_FIXED.json'] = {
      ...TASKS,
      ...updates.tasks
    };
  }
  
  return atomicUpdate(changes, { verbose, ...options });
}

function loadJSON(filename) {
  const filepath = path.join(__dirname, filename);
  return JSON.parse(fs.readFileSync(filepath, 'utf8'));
}

// CLI usage
if (require.main === module) {
  const args = process.argv.slice(2);
  
  if (args.length === 0) {
    log('\n📘 update-all.js - Atomic Update Tool', 'cyan');
    log('='.repeat(60), 'cyan');
    log('\nUsage Examples:', 'blue');
    
    log('\n1️⃣  In your scripts:', 'yellow');
    log('   const { atomicUpdate } = require(\'./.ai/update-all.js\');');
    log('   await atomicUpdate({');
    log('     \'STATUS.json\': { ... },');
    log('     \'PROGRESS.json\': { ... }');
    log('   });');
    
    log('\n2️⃣  Quick task update:', 'yellow');
    log('   const { quickUpdate } = require(\'./.ai/update-all.js\');');
    log('   await quickUpdate(\'task-001\', {');
    log('     progress: { completed_files: 10 },');
    log('     active_task: null,');
    log('     next_task: { id: \'task-002\' }');
    log('   });');
    
    log('\n3️⃣  CLI test mode:', 'yellow');
    log('   node .ai/update-all.js test\n');
    
    process.exit(0);
  }
  
  if (args[0] === 'test') {
    log('\n🧪 Running atomic update test...', 'blue');
    
    // Test: Update last_update timestamps
    const testChanges = {};
    const timestamp = new Date().toISOString().replace('Z', '+07:00');
    
    ['STATUS.json', 'PROGRESS.json', 'BLOCKERS.json'].forEach(file => {
      try {
        const content = loadJSON(file);
        if (file === 'STATUS.json') {
          content.metadata.last_update = timestamp;
        } else {
          content.last_update = timestamp;
        }
        testChanges[file] = content;
      } catch (error) {
        log(`  ⚠️  Could not load ${file} for test`, 'yellow');
      }
    });
    
    if (Object.keys(testChanges).length === 0) {
      log('  ❌ No files to test!', 'red');
      process.exit(1);
    }
    
    atomicUpdate(testChanges, { verbose: true })
      .then(() => {
        log('\n✅ Test completed successfully', 'green');
        log('   All files updated and validated\n', 'green');
        process.exit(0);
      })
      .catch(error => {
        log(`\n❌ Test failed: ${error.message}`, 'red');
        process.exit(1);
      });
  }
}

module.exports = { atomicUpdate, quickUpdate, loadJSON };
