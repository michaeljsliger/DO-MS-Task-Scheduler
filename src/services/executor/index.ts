import { CronJob } from 'cron';
import { Task } from '../../mock_db'

const executeTask = async (task: Task) => {
  console.log(`Executing task: ${task.task}`);
//   query('UPDATE tasks SET executed = TRUE WHERE id = $1', [task.id]);
};

const pollForTasks = async () => {
    const now = new Date();
//   const tasks = query('SELECT * FROM tasks WHERE executed = FALSE AND time <= $1', [now.toISOString()]);


//   tasks.rows.forEach(task: Task => {
//     executeTask(task);
//   });
};

const scheduleRecurringTasks = async () => {
//   const tasks = query('SELECT * FROM tasks WHERE type = $1 AND executed = FALSE', ['recurring']);

//   tasks.rows.forEach(task => {
//     const job = new CronJob(task.cronTime, () => {
//       executeTask(task);
//     }, null, true);
//     job.start();
//   });
};

const startPolling = () => {
  setInterval(pollForTasks, 10000);
};

const initTaskExecutor = async () => {
  await scheduleRecurringTasks();
  startPolling();
};

export default initTaskExecutor;
