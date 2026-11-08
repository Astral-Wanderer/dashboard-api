# Dashboard API – Backend

This is the backend for my project and task dashboard. I built it with Node.js, TypeScript, Express and GraphQL.

The backend handles projects and tasks and stores the data in a PostgreSQL database. My React frontend uses this API to load and update the data.

## Tech Stack

- **Node.js + TypeScript** – Backend code
- **Express** – HTTP server
- **Apollo Server + GraphQL** – API for the frontend
- **PostgreSQL** – Database for projects and tasks
- **pg** – Connecting Node.js to PostgreSQL

## Features

- Get all projects or a single project
- Create and delete projects
- Get all tasks or tasks from a specific project
- Create, update and delete tasks
- Get dashboard statistics, including task counts by status
- Check required task fields and valid task statuses

## Setup

### Requirements

- Node.js and npm
- PostgreSQL installed and running

### Installation

1. Open a terminal in the `dashboard-api` folder.

2. Install the dependencies:

```bash
npm install
```

3. Create a PostgreSQL database named `dashboard_db`.

4. Create the database tables using the SQL file:

```bash
psql -U postgres -d dashboard_db -f src/db/schema.sql
```
5. Create a .env file in the dashboard-api folder and add your PostgreSQL connection settings (DB_HOST, DB_PORT, DB_NAME, DB_USER and DB_PASSWORD).

6. Check the database settings in `src/db/pool.ts`.

   By default, the app connects to PostgreSQL on `localhost:5432` with the database name `dashboard_db` and the user `postgres`.

   The database password can be set using the `DB_PASSWORD` environment variable.

7. Start the backend:

```bash
node --env-file=.env -r ts-node/register src/server.ts
```

The GraphQL API runs at:

`http://localhost:4000/graphql`

You can also check whether the server is running at:

`http://localhost:4000/health`

## Architecture

I separated the GraphQL code from the database queries to keep things organized.

- **server.ts** starts Express and Apollo Server.
- **graphql/typeDefs.ts** defines the GraphQL types, queries and mutations.
- **graphql/resolvers.ts** handles GraphQL requests.
- **projects.repository.ts** contains the database queries for projects.
- **tasks.repository.ts** contains the database queries for tasks and dashboard statistics.
- **db/pool.ts** handles the PostgreSQL connection.

The resolvers call the repository functions, which then read or change data in the database.

## Database

I use two tables: `projects` and `tasks`.

Each project has a name and description. Tasks have a title, description, status and project ID.

Tasks can have one of three statuses:

- `TODO`
- `IN_PROGRESS`
- `DONE`

The tables are created using `src/db/schema.sql`.

When a project is deleted, its related tasks are also deleted.

## GraphQL API

The API is available at:

`http://localhost:4000/graphql`

I use **queries** to get projects, tasks and dashboard statistics.

I use **mutations** to create and delete projects, and to create, update and delete tasks.

The frontend sends GraphQL requests to this API instead of accessing the PostgreSQL database directly.