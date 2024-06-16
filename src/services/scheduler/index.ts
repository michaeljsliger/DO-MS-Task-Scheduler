import express, { Request, Response } from 'express';
import { isValidCron } from 'cron-validator';
// import { query } from '../../database'; // We'll define this later
import DB from '../../mock_db';

const app = express();

// Get all scheduled tasks
app.get('/tasks', async (req: Request, res: Response) => {
    // Get all non-executed, future tasks?
    const tasks = DB.tasks
    res.send(tasks);
})

// Edit the schedule of a task
/*
req.body = {
    id: 123,
    time: timestamp
}
*/
app.post('/tasks/reschedule', (req: Request, res: Response) => {
    const taskId = req.body.id;
    const newTime = req.body.time
    if (!taskId) {
        return res.status(400).send('Bad Request: ID field cannot be empty.')
    }
    if (!newTime) {
        return res.status(400).send('Bad Request: time field cannot be empty.')
    }

    const task = DB.tasks.find(el => el.id == taskId)
    if (!task || task == undefined) {
        return res.status(404).send(`Task with the .id ${taskId} not found.`)
    }
    if (task.type === 'recurring') {
        return res.status(400).send('Bad Request: Cannot edit the schedule of recurring tasks.')
    }

    task.time = newTime;
    res.status(200).send(task);
})

// or app.delete('/tasks/{id}'), but I decided to use .post to keep the API consistent
app.post('/tasks/delete', (req: Request, res: Response) => {
    const taskId = req.body.id;
    if (!taskId) {
        return res.status(400).send('Bad Request: ID field cannot be empty.')
    }

    // Deleting from an array cache, so save index
    let indexOfTask = -1;
    const task = DB.tasks.find((el, idx) => {
        indexOfTask = idx;
        return el.id == taskId
    })
    if (!task || task == undefined) {
        return res.status(404).send(`Task with the .id ${taskId} not found.`)
    }
    if (indexOfTask == -1) {
        return res.status(404).send(`Task with the .id ${taskId} not found.`)
    }

    // indexOfTask > -1
    DB.tasks.splice(indexOfTask);
    res.status(204).send({ message: 'Task deleted' });
})

// One-time task registration
app.post('/tasks/single', async (req: Request, res: Response) => {
    // Validate request body
    if (req.body.time == '' || req.body.time == undefined) {
        return res.status(400).send('Bad Request: Assigned "time" field must not be empty.')
    }
    if (req.body.task == '' || req.body.task == undefined) {
        return res.status(400).send('Bad Request: Assigned "task" field must not be empty.')
    }

    const newTask = {
        id: DB.idCounter++,
        type: 'single',
        cronTime: undefined, // Ignoring req.body.cronTime
        executed: false,
        time: req.body.time,
        task: req.body.task,
    }

    // In DB, template the SQL to prevent injection
    DB.tasks.push(newTask);
    res.status(201).send(newTask)
});

// Recurring task registration
app.post('/tasks/recurring', async (req: Request, res: Response) => {
    // Validate request body
    if (req.body.cronTime == '' || req.body.cronTime == undefined) {
        return res.status(400).send('Bad Request: Assigned "cronTime" field must not be empty.')
    }
    if (req.body.task == '' || req.body.task == undefined) {
        return res.status(400).send('Bad Request: Assigned "task" field must not be empty.')
    }
    if (!isValidCron(req.body.cronTime)) {
        // If the cronTime provided is not valid via cron-validator, return 400
        return res.status(400).send('Bad Request: Assigned "cronTime" field must be in the valid cron format.')
    }

    const newTask = {
        id: DB.idCounter++,
        type: 'single',
        cronTime: req.body.cronTime, 
        executed: false,
        time: undefined, // Ignoring req.body.time for recurring tasks
        task: req.body.task,
    }

    DB.tasks.push(newTask);
    res.status(201).send(newTask)
});

export default app;
