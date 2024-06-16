/*
The choice to use a mock DB is specifically to keep
this project brief and portable. Any system designed
for real-world use would utilize a DB rather than 
caching to better scale.
*/

type Task = {
    id: number;
    type: string; // 'single' or 'recurring'
    time?: string;
    cronTime?: string; // Only used for recurring tasks
    task: string;
    executed: boolean;
};

let tasks: Task[] = [];
let idCounter = 1;

let data = {
    tasks, idCounter
}

export default data