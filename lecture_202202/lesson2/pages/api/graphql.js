import { ApolloServer, gql, makeExecutableSchema } from 'apollo-server-micro';

require('dotenv').config();
const postgres = require('postgres');
const sql = postgres();

const typeDefs = gql`
  type Query {
    users: [User!]!
    user(username: String): User
    todos: [Todo]
  }

  union UpdateResult = Todo | HTTPError

  type Mutation {
    createTodo(title: String!, checked: Boolean!): Todo
    updateTodo(id: ID!, title: String!, checked: Boolean!): UpdateResult
  }

  type HTTPError {
    code: String
    message: String
  }

  type User {
    name: String
    username: String
  }

  type Todo {
    id: ID
    title: String
    checked: Boolean
  }
`;
const users = [
  { name: 'Leeroy Jenkins', username: 'leeroy' },
  { name: 'Foo Bar', username: 'foobar' },
];

async function getTodos() {
  return await sql`select * from todos`;
}

async function createTodo(title, checked) {
  const createValue = await sql`INSERT INTO todos (title, checked) 
  VALUES (${title}, ${checked}) RETURNING id, title, checked`;
  return createValue[0];
}

async function updateTodo(id, title, checked) {
  try {
    const updateValue = await sql`UPDATE todos2 SET title = ${title}, 
    checked = ${checked} WHERE id = ${parseInt(
      id
    )} RETURNING id, title, checked`;

    console.log(updateValue);
    return updateValue[0];
  } catch (ex) {
    console.log(ex);
  }
  return {
    code: '500',
    message: 'oh no I fucked it up again',
  };
}

const resolvers = {
  Query: {
    users() {
      return users;
    },
    user(parent, { username }) {
      return users.find((user) => user.username === username);
    },
    todos(parents, args) {
      return getTodos();
    },
  },
  Mutation: {
    createTodo(parents, args) {
      return createTodo(args.title, args.checked);
    },
    updateTodo(parents, args) {
      return updateTodo(args.id, args.title, args.checked);
    },
  },
  UpdateResult: {
    __resolveType(obj, context, info) {
      if (obj.code) {
        return 'HTTPError';
      }

      if (obj.title) {
        return 'Todo';
      }

      return null;
    },
  },
};

export const schema = makeExecutableSchema({ typeDefs, resolvers });

export const config = {
  api: {
    bodyParser: false,
  },
};

export default new ApolloServer({ schema }).createHandler({
  path: '/api/graphql',
});
