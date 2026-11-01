import { getAllProjects } from './modules/projects/projects.repository';
import { getAllTasks } from './modules/tasks/tasks.repository';
import { pool } from './db/pool';

async function test() {
  try {
    console.log('Projects:', await getAllProjects());
    console.log('Tasks:', await getAllTasks());
  } finally {
    await pool.end();
  }
}

test().catch(console.error);