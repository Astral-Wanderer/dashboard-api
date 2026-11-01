import { pool } from '../../db/pool';

export interface TaskRow {
  id: string;
  title: string;
  description: string;
  status: string;
  project_id: string;
  created_at: string;
}

export async function getAllTasks(): Promise<TaskRow[]> {
  const { rows } = await pool.query(
    'SELECT * FROM tasks ORDER BY created_at DESC'
  );
  return rows;
}

export async function getTasksByProjectId(
  projectId: string
): Promise<TaskRow[]> {
  const { rows } = await pool.query(
    'SELECT * FROM tasks WHERE project_id = $1',
    [projectId]
  );
  return rows;
}

export async function createTask(
  title: string,
  description: string,
  status: string,
  projectId: string
): Promise<TaskRow> {
  const { rows } = await pool.query(
    'INSERT INTO tasks (title, description, status, project_id) VALUES ($1, $2, $3, $4) RETURNING *',
    [title, description, status, projectId]
  );
  return rows[0];
}

export async function updateTask(
  id: string,
  title: string,
  description: string,
  status: string
): Promise<TaskRow | null> {
  const { rows } = await pool.query(
    'UPDATE tasks SET title=$1, description=$2, status=$3 WHERE id=$4 RETURNING *',
    [title, description, status, id]
  );
  return rows[0] ?? null;
}

export async function deleteTask(
  id: string
): Promise<boolean> {
  const { rowCount } = await pool.query(
    'DELETE FROM tasks WHERE id = $1',
    [id]
  );
  return (rowCount ?? 0) > 0;
}
