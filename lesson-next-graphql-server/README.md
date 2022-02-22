# Next.js GraphQL Server

## Setup

First, create a repository on GitHub, clone it and `cd` into the directory:

```sh
git clone <repo url>
cd <repo name>
```

Then run:

```sh
yarn create next-app --example api-routes-apollo-server .
```

## Development

```sh
yarn dev
```

### Explore the GraphQL API with GraphiQL

- check out http://localhost:3000/api/graphql

### Static Result

- Return a list of all todos (static)
- Return one single todo
- Filter list of todos by `checked`

```graphql
{
  todos(filterChecked: false) {
    id
    title
  }
}
```

```graphql
{
  todo(id: "2") {
    id
    title
    checked
  }
}
```

### Add SQL

Make sure that your PostgreSQL is running. You can start it with:

```sh
postgres
```

Open a new tab in your terminal. In this new tab, connect to the database:

```sh
psql postgres
```

Once you are connected, run the following queries:

```sql
CREATE DATABASE todos_next;
CREATE USER todos_next WITH ENCRYPTED PASSWORD 'todos_next';
GRANT ALL PRIVILEGES ON DATABASE todos_next TO todos_next;
```

Once you have succesfully run these queries, quit `psql` with:

```bash
\q
```

Add dependencies:

```sh
yarn add dotenv dotenv-cli postgres ley
```

Add the file .env in the project root

```sh
PGHOST=localhost
PGDATABASE=todos_next
PGUSERNAME=todos_next
PGPASSWORD=todos_next
```

Switch back to your editor and create a folder called `migrations`. In the `migrations` folder:

1. Create the file `00000-create-todos-table.js` and copy and paste the content from https://github.com/upleveled/react-graphql-frontend-backend-lessons/blob/main/lesson-next-graphql-server/todos/migrations/00000-create-todos-table.js
2. Create the file `00001-insert-todos.js` and copy and paste the content from https://github.com/upleveled/react-graphql-frontend-backend-lessons/blob/main/lesson-next-graphql-server/todos/migrations/00001-insert-todos.js

In a terminal, run the migrations:

```sh
yarn dotenv ley up
```

Connect to the database:

```js
require("dotenv").config();
const postgres = require("postgres");
const sql = postgres();
```

- Return a list of all todos
- Return one single todo
- Filter list of todos by `checked`

### Mutation

- Create a todo

```graphql
# Write your query or mutation here
mutation {
  createTodo(title: "Call my Brother") {
    id
    title
    checked
  }
}
```

### Nesting

What? 🤯

- create manipulated property based on an existing one e.g. slug

## Home work: Add Apollo Client

- will only work on clientside
- for server side just copy: https://github.com/zeit/next.js/tree/master/examples/api-routes-apollo-server-and-client
