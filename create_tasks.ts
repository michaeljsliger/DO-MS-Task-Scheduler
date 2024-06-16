const axios = require('axios');

// Base URL of the API
const BASE_URL = 'http://localhost:3000/api/tasks/single';

// Current time
const currentTime = Math.floor(Date.now() / 1000);

// Function to create a task
const createTask = async (time: any, task: any) => {
  // Convert to ISO 8601 format
  const isoTime = new Date(time * 1000).toISOString();

  // JSON payload
  const payload = {
    time: isoTime,
    task: task,
  };

  try {
    // Send POST request
    const response = await axios.post(BASE_URL, payload, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log(`Created task: ${task} at ${isoTime}`);
  } catch (error) {
    console.error(`Error creating task: ${task} at ${isoTime}`, error);
  }
};

// Create tasks for the next minute
const createTasks = async () => {
  for (let i = 1; i <= 10; i++) {
    const taskTime = currentTime + (i * 6); // Every 6 seconds in the next minute
    await createTask(taskTime, `Task ${i}`);
  }
};

// Execute the function to create tasks
createTasks();
