import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  type Project {
    id: ID!
    name: String!
    description: String!
    createdAt: String!
    tasks: [Task!]!
  }

  type Task {
    id: ID!
    title: String!
    description: String!
    status: String!
    projectId: ID!
    createdAt: String!
  }

  type DashboardStats {
    totalTasks: Int!
    doneTasks: Int!
    inProgressTasks: Int!
    todoTasks: Int!
    totalProjects: Int!
  }

  type Query {
    projects: [Project!]!
    project(id: ID!): Project
    tasks(projectId: ID): [Task!]!
    dashboardStats: DashboardStats!
  }

  type Mutation {
    createProject(name: String!, description: String!): Project!
    deleteProject(id: ID!): Boolean!
    createTask(
      title: String!
      description: String!
      status: String!
      projectId: ID!
    ): Task!
    updateTask(
      id: ID!
      title: String!
      description: String!
      status: String!
    ): Task!
    deleteTask(id: ID!): Boolean!
  }
`;
