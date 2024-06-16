import { CronJob } from 'cron';
import DB from '../../mock_db'

const executeTask = (task: any) => {
  const timestamp = new Date().toISOString();
  console.log(`Executing task: ${task.task} at ${timestamp}`);
  // Set to executed in the 'DB'
  const dbTask = DB.tasks.find(el => el.id == task.id)
  if (!dbTask) {
    return 
  }
  dbTask.executed = true;
};

const pollForTasks = async () => {
  console.log("Polling for new tasks...")
  const now = new Date();
  const nextTenSeconds = new Date(now.getTime() + 10000);
  const tasksToExecute = DB.tasks.filter((el, idx) => {
    if (el.type == 'single' && 
        el.executed == false &&
        el.time && 
        new Date(el.time) <= nextTenSeconds && 
        new Date(el.time) >= now) {
      return true;
    }
    // Base case, return false
    return false;
  })
  console.log(`Found ${tasksToExecute.length} new tasks to execute in the next few seconds...`)

  tasksToExecute.forEach(task => {
    executeTask(task);
  });
};

// Only called on init, need a second function to call
// newly added cron tasks.
const scheduleRecurringTasks = async () => {
  console.log("Scheduling any new recurring tasks...")
  const tasks = DB.tasks.filter((el) => {
    if (el.type == 'recurring' && 
        el.cronTime != undefined &&
        !el.cronScheduled) {
      el.cronScheduled = true;
      return true;
    }
    return false;
  })

  tasks.forEach(task => {
    if (!task.cronTime) {
      return;
    }
    const job = new CronJob(task.cronTime, () => {
      executeTask(task);
    }, null, true);
    job.start();
  });
};

const startPolling = () => {
  setInterval(pollForTasks, 10000);
  setInterval(scheduleRecurringTasks, 25000);
  setInterval(taskCleanup, 25000);
};

const initTaskExecutor = () => {
  startPolling();
};

const taskCleanup = async () => {
    // Remove the executed non-recurring tasks from the cache
    DB.tasks = DB.tasks.filter(task => !(task.type === 'single' && task.executed));
}

export default initTaskExecutor;
