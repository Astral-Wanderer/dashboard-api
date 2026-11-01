import * as PR from '../modules/projects/projects.repository';
import * as TR from '../modules/tasks/tasks.repository';

export const resolvers = {
  Query: {
    projects: () => PR.getAllProjects(),
    project: (_: unknown, { id }: { id: string }) =>
      PR.getProjectById(id),
    tasks: (_: unknown, { projectId }: { projectId?: string }) =>
      projectId ? TR.getTasksByProjectId(projectId) : TR.getAllTasks(),
    dashboardStats: () => TR.getDashboardStats(),
  },
  Mutation: {
    createProject: (_: unknown, { name, description }: any) =>
      PR.createProject(name, description),
    deleteProject: (_: unknown, { id }: { id: string }) =>
      PR.deleteProject(id),
    createTask: (_: unknown, args: any) =>
      TR.createTask(args.title, args.description, args.status, args.projectId),
    updateTask: (_: unknown, args: any) =>
      TR.updateTask(args.id, args.title, args.description, args.status),
    deleteTask: (_: unknown, { id }: { id: string }) =>
      TR.deleteTask(id),
  },
  Project: {
    tasks: (parent: any) => TR.getTasksByProjectId(parent.id),
    createdAt: (parent: any) => parent.created_at,
  },
  Task: {
    projectId: (parent: any) => parent.project_id,
    createdAt: (parent: any) => parent.created_at,
  },
};
