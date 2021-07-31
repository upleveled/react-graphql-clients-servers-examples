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

const apolloServer = new ApolloServer({ typeDefs, resolvers });

export const config = {
  api: {
    bodyParser: false,
  },
};

await apolloServer.start();

export default apolloServer.createHandler({ path: '/api/graphql' });
