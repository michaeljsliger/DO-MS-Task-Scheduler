import express, { Request, Response } from 'express';
// import { query } from '../../database'; // We'll define this later

const app = express();

// One-time task registration
app.post('/tasks/single', async (req: Request, res: Response) => {
    res.status(201);
//   const { time, task } = req.body;
//   try {
//     const result = await query(
//       'INSERT INTO tasks(type, time, task) VALUES($1, $2, $3) RETURNING id',
//       ['one-time', time, task]
//     );
//     res.status(201).json({ id: result.rows[0].id });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
});

// Recurring task registration
app.post('/tasks/recurring', async (req: Request, res: Response) => {
    res.status(201);
//   const { cronTime, task } = req.body;
//   try {
//     const result = await query(
//       'INSERT INTO tasks(type, cron_time, task) VALUES($1, $2, $3) RETURNING id',
//       ['recurring', cronTime, task]
//     );
//     res.status(201).json({ id: result.rows[0].id });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
});

export default app;
