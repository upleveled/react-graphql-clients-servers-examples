import { ApolloServer, gql } from 'apollo-server-micro';

const typeDefs = gql`
  type Query {
    users: [User!]!
  }
  type User {
    id: Int
    name: String
  }
`;

const resolvers = {
  Query: {
    users(parent, args, context) {
      console.log(parent, args, context);
      return [
        { id: 1, name: 'Nextjs' },
        { id: 2, name: 'Nik' },
      ];
    },
  },
};

export const config = {
  api: {
    bodyParser: false,
  },
};

const apolloServer = new ApolloServer({ typeDefs, resolvers });

const startServer = apolloServer.start();

export default async function graphQlHandler(req, res) {
  // For Apollo Studio
  // https://stackoverflow.com/a/68890931/1268612
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader(
    'Access-Control-Allow-Origin',
    'https://studio.apollographql.com',
  );
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Methods, Access-Control-Allow-Origin, Access-Control-Allow-Credentials, Access-Control-Allow-Headers',
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'POST, GET, PUT, PATCH, DELETE, OPTIONS, HEAD',
  );

  if (req.method === 'OPTIONS') {
    res.end();
    return false;
  }

  await startServer;
  await apolloServer.createHandler({
    path: '/api/graphql',
  })(req, res);
}
