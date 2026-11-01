import { pool } from '../../db/pool';

export interface ProjectRow {
  id: string;
  name: string;
  description: string;
  created_at: string;
}

export async function getAllProjects(): Promise<ProjectRow[]> {
  const { rows } = await pool.query(
    'SELECT * FROM projects ORDER BY created_at DESC'
  );
  return rows;
}

export async function getProjectById(
  id: string
): Promise<ProjectRow | null> {
  const { rows } = await pool.query(
    'SELECT * FROM projects WHERE id = $1',
    [id]
  );
  return rows[0] ?? null;
}

export async function createProject(
  name: string,
  description: string
): Promise<ProjectRow> {
  const { rows } = await pool.query(
    'INSERT INTO projects (name, description) VALUES ($1, $2) RETURNING *',
    [name, description]
  );
  return rows[0];
}

export async function deleteProject(
  id: string
): Promise<boolean> {
  const { rowCount } = await pool.query(
    'DELETE FROM projects WHERE id = $1',
    [id]
  );
  return (rowCount ?? 0) > 0;
}
