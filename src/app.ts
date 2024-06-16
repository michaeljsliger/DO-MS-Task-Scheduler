import express from 'express';
import schedulerApp from './services/scheduler';
import initTaskExecutor from './services/executor';

const PORT = process.env.PORT || 3000;
const app = express();

// Middleware
// Foregoing the robust middleware a service like this should have
// in a production environment
app.use(express.json());

// API Scheduler Routes
// /api/tasks/single
// /api/tasks/recurring
app.use('/api', schedulerApp);

// Start the API Scheduler server
app.listen(PORT, () => {
  console.log(`API Gateway running on http://localhost:${PORT}`);
});

// Initialize the task executor
initTaskExecutor();