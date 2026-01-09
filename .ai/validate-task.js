#!/usr/bin/env node
/**
 * validate-task.js
 * Validates if a task can be started based on dependencies
 * 
 * Usage: node scripts/validate-task.js --task=task-001
 */

const fs = require('fs');
const path = require('path');

// Load TASKS.json
function loadTasks() {
  try {
    const tasksPath = path.join(process.cwd(), '.ai', 'TASKS.json');
    const content = fs.readFileSync(tasksPath, 'utf-8');
    return JSON.parse(content);
  } catch (error) {
    console.error(`❌ Error loading TASKS.json: ${error.message}`);
    process.exit(1);
  }
}

// Load STATUS.json
function loadStatus() {
  try {
    const statusPath = path.join(process.cwd(), '.ai', 'STATUS.json');
    const content = fs.readFileSync(statusPath, 'utf-8');
    return JSON.parse(content);
  } catch (error) {
    console.error(`❌ Error loading STATUS.json: ${error.message}`);
    process.exit(1);
  }
}

// Priority weights for sorting
function getPriorityWeight(priority) {
  const weights = {
    'P0': 0,
    'P1': 1,
    'P2': 2,
    'P3': 3
  };
  return weights[priority] || 999;
}

// Check if all dependencies are completed
function checkDependencies(task, allTasks) {
  const issues = [];

  if (!task.dependencies || task.dependencies.length === 0) {
    return { canStart: true, issues: [] };
  }

  for (const dep of task.dependencies) {
    if (typeof dep === 'string') {
      // Simple dependency (just file path)
      if (!fs.existsSync(dep)) {
        issues.push(`❌ Dependency file missing: ${dep}`);
      }
    } else if (typeof dep === 'object') {
      // Complex dependency (task reference)
      const depTask = allTasks.find(t => t.id === dep.task_id);

      if (!depTask) {
        issues.push(`❌ Dependency task not found: ${dep.task_id}`);
      } else if (depTask.status !== 'completed') {
        issues.push(`❌ Dependency task not completed: ${dep.task_id} (status: ${depTask.status})`);
      } else if (dep.status_required === 'completed_and_verified' && !depTask.verified) {
        issues.push(`⚠️  Dependency task not verified: ${dep.task_id}`);
      }
    }
  }

  return {
    canStart: issues.filter(i => i.startsWith('❌')).length === 0,
    issues
  };
}

// Validate if task meets all criteria to start
function validateTask(taskId) {
  console.log(`\n🔍 Validating Task: ${taskId}`);
  console.log('─'.repeat(60));

  const tasksData = loadTasks();
  const status = loadStatus();

  // Find the task
  const task = tasksData.tasks.find(t => t.id === taskId);

  if (!task) {
    console.error(`\n❌ ERROR: Task ${taskId} not found in TASKS.json`);
    return false;
  }

  console.log(`\n📋 Task Details:`);
  console.log(`   Title: ${task.title}`);
  console.log(`   Priority: ${task.priority}`);
  console.log(`   Status: ${task.status}`);
  console.log(`   Phase: ${task.phase}`);
  console.log(`   Estimated Effort: ${task.estimated_effort}`);

  // Check 1: Task not already completed
  if (task.status === 'completed') {
    console.log(`\n✅ Task already completed at: ${task.completed_at}`);
    console.log(`   Completed by: ${task.completed_by}`);
    return true;
  }

  // Check 2: Task not in progress by someone else
  if (task.status === 'in_progress' && task.assigned_to) {
    console.log(`\n⚠️  Task currently in progress by: ${task.assigned_to}`);
    console.log(`   Started at: ${task.started_at}`);
    return false;
  }

  // Check 3: Dependencies
  const depCheck = checkDependencies(task, tasksData.tasks);

  console.log(`\n🔗 Dependencies:`);
  if (!task.dependencies || task.dependencies.length === 0) {
    console.log(`   ✅ No dependencies`);
  } else {
    console.log(`   Total: ${task.dependencies.length}`);
    if (depCheck.issues.length > 0) {
      depCheck.issues.forEach(issue => console.log(`   ${issue}`));
    } else {
      console.log(`   ✅ All dependencies met`);
    }
  }

  // Check 4: Blocked by other tasks
  if (task.blocked_by && task.blocked_by.length > 0) {
    console.log(`\n🚧 Blocked By:`);
    for (const blockerId of task.blocked_by) {
      const blocker = tasksData.tasks.find(t => t.id === blockerId);
      if (blocker && blocker.status !== 'completed') {
        console.log(`   ❌ ${blockerId}: ${blocker.title} (${blocker.status})`);
        depCheck.canStart = false;
      }
    }
  }

  // Check 5: Current phase match
  if (task.phase !== status.current_phase.id) {
    console.log(`\n⚠️  WARNING: Task phase (${task.phase}) differs from current phase (${status.current_phase.id})`);
    console.log(`   Consider completing current phase tasks first`);
  }

  // Final verdict
  console.log(`\n📊 Validation Result:`);
  console.log('─'.repeat(60));

  if (depCheck.canStart) {
    console.log(`✅ READY TO START`);
    console.log(`\n🎯 Next Steps:`);
    console.log(`   1. Update TASKS.json:`);
    console.log(`      - Set status to "in_progress"`);
    console.log(`      - Set assigned_to to your session name`);
    console.log(`      - Set started_at timestamp`);
    console.log(`   2. Read task deliverables and acceptance criteria`);
    console.log(`   3. Begin work!`);
    return true;
  } else {
    console.log(`❌ NOT READY - Resolve dependencies first`);
    return false;
  }
}

// List all available tasks
function listAvailableTasks() {
  console.log(`\n📋 Available Tasks (Can Start Now)`);
  console.log('='.repeat(80));

  const tasksData = loadTasks();
  const status = loadStatus();

  const availableTasks = tasksData.tasks
    .filter(t => t.status === 'open')
    .filter(t => {
      const depCheck = checkDependencies(t, tasksData.tasks);
      return depCheck.canStart;
    })
    .sort((a, b) => {
      // Sort by priority first, then by task ID
      const priorityDiff = getPriorityWeight(a.priority) - getPriorityWeight(b.priority);
      if (priorityDiff !== 0) return priorityDiff;
      return a.id.localeCompare(b.id);
    });

  if (availableTasks.length === 0) {
    console.log(`\n⚠️  No tasks available to start right now.`);
    console.log(`   Check blocked tasks and resolve dependencies first.`);
    return;
  }

  console.log(`\nFound ${availableTasks.length} task(s) ready to start:\n`);

  availableTasks.forEach((task, idx) => {
    console.log(`${idx + 1}. [${task.priority}] ${task.id}: ${task.title}`);
    console.log(`   Phase: ${task.phase} | Effort: ${task.estimated_effort}`);
    console.log(`   Deliverables: ${task.deliverables.length} file(s)`);
    console.log('');
  });

  console.log(`\n🎯 Recommended: Start with task #1 (highest priority)`);
  console.log(`\nTo validate specific task: node scripts/validate-task.js --task=<task-id>`);
}

// Main execution
const args = process.argv.slice(2);

if (args.includes('--list')) {
  listAvailableTasks();
} else {
  const taskArg = args.find(arg => arg.startsWith('--task='));

  if (!taskArg) {
    console.error('Usage:');
    console.error('  node scripts/validate-task.js --task=<task-id>  # Validate specific task');
    console.error('  node scripts/validate-task.js --list            # List all available tasks');
    console.error('\nExample:');
    console.error('  node scripts/validate-task.js --task=task-001');
    process.exit(1);
  }

  const taskId = taskArg.split('=')[1];
  const success = validateTask(taskId);

  process.exit(success ? 0 : 1);
}
