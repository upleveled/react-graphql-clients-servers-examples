import { ServerResponse } from 'node:http';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { ApolloServer, gql } from 'apollo-server-micro';
import { NextApiRequest, NextApiResponse } from 'next';

const typeDefs = gql`
  type User {
    id: Int
    name: String
  }
  type Book {
    id: Int
    name: String
  }
  type Query {
    users: [User!]!
    books: [Book!]!
  }
`;

const resolvers = {
  Query: {
    users(parent: void, args: {}, context: { res: ServerResponse }) {
      console.log(parent, args, Object.keys(context));
      return [
        { id: 1, name: 'Anna' },
        { id: 2, name: 'Nik' },
      ];
    },

    books(parent: void, args: {}, context: { res: ServerResponse }) {
      console.log(parent, args, Object.keys(context));
      return [
        { id: 1, name: 'Book 1' },
        { id: 2, name: 'Book 2' },
      ];
    },
  },
};

export const config = {
  api: {
    bodyParser: false,
  },
};

export const schema = makeExecutableSchema({ typeDefs, resolvers });

const apolloServer = new ApolloServer({
  schema,
  // Return response to allow setting cookies in resolvers
  context({ res }) {
    return {
      res,
    };
  },
});

const startServer = apolloServer.start();

export default async function graphQlHandler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  // Headers for Apollo Studio
  // https://stackoverflow.com/a/68890931/1268612
  Object.entries({
    'Access-Control-Allow-Credentials': 'true',
    'Access-Control-Allow-Origin': 'https://studio.apollographql.com',
    'Access-Control-Allow-Headers':
      'Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Methods, Access-Control-Allow-Origin, Access-Control-Allow-Credentials, Access-Control-Allow-Headers',
    'Access-Control-Allow-Methods':
      'POST, GET, PUT, PATCH, DELETE, OPTIONS, HEAD',
  }).forEach(([key, value]) => res.setHeader(key, value));

  if (req.method === 'OPTIONS') {
    res.end();
    return false;
  }

  await startServer;
  await apolloServer.createHandler({
    path: '/api/graphql',
  })(req, res);
}
