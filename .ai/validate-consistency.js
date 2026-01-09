#!/usr/bin/env node

/**
 * validate-consistency.js
 * 
 * Validates consistency across all Smart Brief JSON files
 * Ensures data integrity and synchronization
 * 
 * Usage: node .ai/validate-consistency.js
 * Exit code: 0 = success, 1 = validation failed
 */

const fs = require('fs');
const path = require('path');

// Color codes for terminal output
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m'
};

// Helper function for colored output
function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

// Load JSON file with error handling
function loadJSON(filename) {
  try {
    const filepath = path.join(__dirname, filename);
    const content = fs.readFileSync(filepath, 'utf8');
    return JSON.parse(content);
  } catch (error) {
    throw new Error(`Failed to load ${filename}: ${error.message}`);
  }
}

// Format timestamp for comparison
function parseTimestamp(timestamp) {
  return new Date(timestamp);
}

// Main validation function
async function validateConsistency() {
  log('\n' + '='.repeat(70), 'cyan');
  log('  🔍 SMART BRIEF SYSTEM - CONSISTENCY VALIDATION', 'cyan');
  log('='.repeat(70) + '\n', 'cyan');
  
  const errors = [];
  const warnings = [];
  let checksPerformed = 0;
  
  try {
    // Load all JSON files
    log('📁 Loading JSON files...', 'blue');
    const STATUS = loadJSON('STATUS.json');
    const PROGRESS = loadJSON('PROGRESS.json');
    const BLOCKERS = loadJSON('BLOCKERS.json');
    const TASKS = loadJSON('TASKS_FIXED.json');
    const CHANGELOG = loadJSON('CHANGELOG.json');
    const ENVIRONMENT = loadJSON('ENVIRONMENT.json');
    const HEALTH = loadJSON('HEALTH.json');
    
    log('   ✅ All 7 JSON files loaded successfully\n', 'green');
    
    // ===== VALIDATION 1: Progress percentage accuracy =====
    log('🔍 Check 1: Progress calculation accuracy...', 'blue');
    checksPerformed++;
    
    const expectedProgress = (PROGRESS.overall.completed_files / PROGRESS.overall.total_files) * 100;
    const actualProgress = PROGRESS.overall.progress_percentage;
    
    if (Math.abs(actualProgress - expectedProgress) > 0.1) {
      errors.push({
        check: 'Progress calculation',
        file: 'PROGRESS.json',
        field: 'overall.progress_percentage',
        expected: expectedProgress.toFixed(1) + '%',
        actual: actualProgress + '%',
        message: 'Progress percentage does not match completed files ratio'
      });
    } else {
      log(`   ✅ Progress correct: ${actualProgress}% (${PROGRESS.overall.completed_files}/${PROGRESS.overall.total_files} files)`, 'green');
    }
    
    // ===== VALIDATION 2: Timestamp consistency =====
    log('\n🔍 Check 2: Timestamp synchronization...', 'blue');
    checksPerformed++;
    
    const timestamps = {
      'STATUS.json': parseTimestamp(STATUS.metadata.last_update),
      'PROGRESS.json': parseTimestamp(PROGRESS.last_update),
      'BLOCKERS.json': parseTimestamp(BLOCKERS.last_update),
      'CHANGELOG.json': parseTimestamp(CHANGELOG.last_update)
    };
    
    const latestTimestamp = new Date(Math.max(...Object.values(timestamps)));
    let allSynced = true;
    
    for (const [file, timestamp] of Object.entries(timestamps)) {
      const diffMinutes = (latestTimestamp - timestamp) / (1000 * 60);
      
      if (diffMinutes > 60) {
        warnings.push({
          check: 'Timestamp sync',
          file,
          field: 'last_update',
          message: `Timestamp is ${Math.round(diffMinutes)} minutes behind latest update`,
          severity: 'medium'
        });
        allSynced = false;
      }
    }
    
    if (allSynced) {
      log('   ✅ All timestamps synchronized', 'green');
    } else {
      log('   ⚠️  Some timestamps are out of sync (see warnings below)', 'yellow');
    }
    
    // ===== VALIDATION 3: Task count consistency =====
    log('\n🔍 Check 3: Task count consistency...', 'blue');
    checksPerformed++;
    
    const completedTasks = Object.values(TASKS.tasks).filter(t => t.status === 'completed').length;
    const progressTasksCompleted = PROGRESS.tasks.completed;
    
    if (completedTasks !== progressTasksCompleted) {
      errors.push({
        check: 'Task count',
        file: 'PROGRESS.json',
        field: 'tasks.completed',
        expected: completedTasks,
        actual: progressTasksCompleted,
        message: 'Completed task count mismatch between TASKS and PROGRESS'
      });
    } else {
      log(`   ✅ Task counts match: ${completedTasks} completed`, 'green');
    }
    
    // ===== VALIDATION 4: Active task exists =====
    log('\n🔍 Check 4: Active task validation...', 'blue');
    checksPerformed++;
    
    if (STATUS.active_task && STATUS.active_task.id !== null) {
      const activeTaskId = STATUS.active_task.id;
      
      // Check if it's a regular task or special task
      if (activeTaskId.startsWith('task-')) {
        const taskKey = activeTaskId.split('-')[1];
        const taskExists = TASKS.tasks.hasOwnProperty(taskKey);
        
        if (!taskExists) {
          errors.push({
            check: 'Active task',
            file: 'STATUS.json',
            field: 'active_task.id',
            value: activeTaskId,
            message: `Active task ${activeTaskId} not found in TASKS.json`
          });
        } else {
          log(`   ✅ Active task ${activeTaskId} exists in TASKS.json`, 'green');
        }
      } else {
        log(`   ✅ Active task ${activeTaskId} is a special task (not in TASKS.json)`, 'green');
      }
    } else {
      log('   ℹ️  No active task currently', 'cyan');
    }
    
    // ===== VALIDATION 5: Next task dependencies =====
    log('\n🔍 Check 5: Next task dependencies...', 'blue');
    checksPerformed++;
    
    if (STATUS.next_task && STATUS.next_task.id) {
      const nextTaskId = STATUS.next_task.id;
      const nextTaskKey = nextTaskId.split('-')[1];
      
      if (TASKS.tasks[nextTaskKey]) {
        const dependencies = TASKS.tasks[nextTaskKey].dependencies || [];
        const allDepsSatisfied = dependencies.every(depId => {
          const depKey = depId.split('-')[1];
          return TASKS.tasks[depKey] && TASKS.tasks[depKey].status === 'completed';
        });
        
        if (!allDepsSatisfied && STATUS.next_task.ready_to_start === true) {
          warnings.push({
            check: 'Dependencies',
            file: 'STATUS.json',
            field: 'next_task.ready_to_start',
            message: `Task ${nextTaskId} marked ready but not all dependencies completed`,
            severity: 'high'
          });
        } else if (allDepsSatisfied) {
          log(`   ✅ Next task ${nextTaskId} dependencies all completed`, 'green');
        } else {
          log(`   ℹ️  Next task ${nextTaskId} waiting for dependencies`, 'cyan');
        }
      }
    } else {
      log('   ℹ️  No next task specified', 'cyan');
    }
    
    // ===== VALIDATION 6: Blocker count consistency =====
    log('\n🔍 Check 6: Blocker count validation...', 'blue');
    checksPerformed++;
    
    const activeBlockerCount = BLOCKERS.active_blockers.length;
    const summaryActiveCount = BLOCKERS.summary.total_blockers;
    
    if (activeBlockerCount !== summaryActiveCount) {
      errors.push({
        check: 'Blocker count',
        file: 'BLOCKERS.json',
        field: 'summary.total_blockers',
        expected: activeBlockerCount,
        actual: summaryActiveCount,
        message: 'Active blocker count mismatch between array and summary'
      });
    } else {
      log(`   ✅ Blocker counts match: ${activeBlockerCount} active`, 'green');
    }
    
    // ===== VALIDATION 7: CHANGELOG entry count =====
    log('\n🔍 Check 7: Changelog entry count...', 'blue');
    checksPerformed++;
    
    const changelogEntries = CHANGELOG.entries.length;
    const changelogSummary = CHANGELOG.summary.total_entries;
    
    if (changelogEntries !== changelogSummary) {
      errors.push({
        check: 'Changelog count',
        file: 'CHANGELOG.json',
        field: 'summary.total_entries',
        expected: changelogEntries,
        actual: changelogSummary,
        message: 'Changelog entry count mismatch'
      });
    } else {
      log(`   ✅ Changelog entry count correct: ${changelogEntries}`, 'green');
    }
    
    // ===== VALIDATION 8: File category totals =====
    log('\n🔍 Check 8: File category totals...', 'blue');
    checksPerformed++;
    
    const categoriesTotal = Object.values(PROGRESS.by_category).reduce((sum, cat) => sum + cat.total, 0);
    const overallTotal = PROGRESS.overall.total_files;
    
    if (categoriesTotal !== overallTotal) {
      errors.push({
        check: 'File totals',
        file: 'PROGRESS.json',
        field: 'by_category totals',
        expected: overallTotal,
        actual: categoriesTotal,
        message: 'Category file totals do not match overall total'
      });
    } else {
      log(`   ✅ Category totals match: ${categoriesTotal} files`, 'green');
    }
    
    // ===== VALIDATION 9: Completed files count =====
    log('\n🔍 Check 9: Completed files count...', 'blue');
    checksPerformed++;
    
    const completedByCategory = Object.values(PROGRESS.by_category).reduce((sum, cat) => sum + cat.completed, 0);
    const overallCompleted = PROGRESS.overall.completed_files;
    
    if (completedByCategory !== overallCompleted) {
      errors.push({
        check: 'Completed files',
        file: 'PROGRESS.json',
        field: 'overall.completed_files',
        expected: completedByCategory,
        actual: overallCompleted,
        message: 'Completed files mismatch between categories and overall'
      });
    } else {
      log(`   ✅ Completed files count correct: ${overallCompleted}`, 'green');
    }
    
    // ===== VALIDATION 10: Project name consistency =====
    log('\n🔍 Check 10: Project name consistency...', 'blue');
    checksPerformed++;
    
    const projectNames = {
      'STATUS.json': STATUS.project.name,
      'PROGRESS.json': PROGRESS.project,
      'BLOCKERS.json': BLOCKERS.project,
      'CHANGELOG.json': CHANGELOG.project
    };
    
    const uniqueNames = new Set(Object.values(projectNames));
    if (uniqueNames.size > 1) {
      warnings.push({
        check: 'Project name',
        files: Object.keys(projectNames).join(', '),
        message: 'Project name inconsistent across files',
        values: Object.entries(projectNames).map(([file, name]) => `${file}: "${name}"`).join(', '),
        severity: 'low'
      });
    } else {
      log(`   ✅ Project name consistent across all files`, 'green');
    }
    
    // ===== PRINT SUMMARY =====
    log('\n' + '='.repeat(70), 'cyan');
    log('  📊 VALIDATION SUMMARY', 'cyan');
    log('='.repeat(70), 'cyan');
    
    log(`\n  Files validated: ${7}`, 'blue');
    log(`  Checks performed: ${checksPerformed}`, 'blue');
    log(`  Errors found: ${errors.length}`, errors.length === 0 ? 'green' : 'red');
    log(`  Warnings: ${warnings.length}`, warnings.length === 0 ? 'green' : 'yellow');
    
    if (errors.length === 0 && warnings.length === 0) {
      log('\n' + '✅'.repeat(35), 'green');
      log('  ALL VALIDATIONS PASSED! JSON FILES ARE CONSISTENT.', 'green');
      log('✅'.repeat(35) + '\n', 'green');
      return 0;
    }
    
    // Print errors
    if (errors.length > 0) {
      log(`\n❌ ERRORS FOUND (${errors.length}):\n`, 'red');
      errors.forEach((err, idx) => {
        log(`${idx + 1}. ${err.check} - ${err.file}`, 'red');
        log(`   Field: ${err.field}`, 'yellow');
        log(`   ${err.message}`, 'yellow');
        if (err.expected !== undefined) {
          log(`   Expected: ${err.expected}, Got: ${err.actual}`, 'yellow');
        }
        log('');
      });
    }
    
    // Print warnings
    if (warnings.length > 0) {
      log(`⚠️  WARNINGS (${warnings.length}):\n`, 'yellow');
      warnings.forEach((warn, idx) => {
        log(`${idx + 1}. ${warn.check} - ${warn.file || warn.files}`, 'yellow');
        if (warn.field) log(`   Field: ${warn.field}`, 'yellow');
        log(`   ${warn.message}`, 'yellow');
        if (warn.severity) log(`   Severity: ${warn.severity}`, 'yellow');
        log('');
      });
    }
    
    log('='.repeat(70) + '\n', 'cyan');
    
    return errors.length > 0 ? 1 : 0;
    
  } catch (error) {
    log(`\n❌ VALIDATION FAILED WITH ERROR:`, 'red');
    log(`   ${error.message}\n`, 'red');
    log(`Stack trace:`, 'yellow');
    log(error.stack, 'yellow');
    return 1;
  }
}

// Run validation
if (require.main === module) {
  validateConsistency()
    .then(exitCode => {
      process.exit(exitCode);
    })
    .catch(error => {
      console.error('Fatal error:', error);
      process.exit(1);
    });
}

module.exports = { validateConsistency, loadJSON };
