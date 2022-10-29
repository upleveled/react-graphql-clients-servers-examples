import { makeExecutableSchema } from '@graphql-tools/schema';
import { ApolloServer, gql } from 'apollo-server-micro';

require('dotenv').config();
const postgres = require('postgres');
const sql = postgres();

const users = [
  { name: 'Leeroy Jenkins', username: 'leeroy' },
  { name: 'Foo Bar', username: 'foobar' },
];

// const todos = [
//   { id: "abc", title: "Buy Tomatoes", checked: true },
//   { id: "bcd", title: "Call Mom", checked: false },
//   { id: "cde", title: "Call Dad", checked: false },
// ];

const typeDefs = gql`
  type User {
    name: String
    username: String
  }
  type Todo {
    id: String
    title: String
    checked: Boolean
  }
  type Query {
    users: [User!]!
    user(username: String): User
    todos(filterChecked: Boolean): [Todo]
    todo(id: String): Todo
  }

  type Mutation {
    createTodo(title: String!): Todo
  }
`;

// async function getTodos() {
//   return await sql`select * from todos`;
// }

async function getFilteredTodos(checked: boolean) {
  return await sql`select * from todos WHERE checked = ${checked}`;
}

async function getTodo(id: number) {
  const result = await sql`select * from todos WHERE id = ${id}`;
  return result[0];
}

async function createTodo(title: string) {
  const result = await sql`INSERT INTO todos (title, checked)
  VALUES (${title}, ${false}) RETURNING id, title, checked;`;
  return result[0];
}

const resolvers = {
  Mutation: {
    createTodo: (parent: void, args: { title: string }) => {
      return createTodo(args.title);
    },
  },
  Query: {
    todos: (parent: void, args: { filterChecked: boolean }) => {
      if (args.filterChecked === true) {
        return getFilteredTodos(true);
      }
      return getFilteredTodos(false);
    },
    todo: (parent: void, args: { id: number }) => {
      // return todos.find((todo) => todo.id === args.id);
      return getTodo(args.id);
    },
    users() {
      return users;
    },
    user(parent: void, args: { username: string }) {
      return users.find((user) => user.username === args.username);
    },
  },
};

export const schema = makeExecutableSchema({ typeDefs, resolvers });

export const config = {
  api: {
    bodyParser: false,
  },
};

const server = new ApolloServer({ schema });
await server.start();

export default server.createHandler({
  path: '/api/graphql',
});
