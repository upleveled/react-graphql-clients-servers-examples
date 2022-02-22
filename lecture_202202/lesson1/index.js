import { ApolloServer, gql } from 'apollo-server';

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = gql`
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "Book" type defines the queryable fields for every book in our data source.
  type Book {
    title: String
    author: String
    id: ID
    createdAt: String
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    books: [Book]
    book(id: ID): Book
  }
`;

// DataSource
const bookDatabase = [
  {
    id: 1,
    title: 'The Awakening',
    author: 'Kate Chopin',
    begin_with: 458295298,
  },
  {
    id: 2,
    title: 'City of Glass',
    author: 'Paul Auster',
    begin_with: 471518098,
  },
  {
    id: 3,
    title: 'IT',
    author: 'Stephen King',
    begin_with: 471518098,
  },
  {
    id: 4,
    title: 'Harry Potter 1-7',
    author: 'JK Rowling',
    begin_with: 471518098,
  },
  {
    id: 5,
    title: 'Lord of the Rings ',
    author: 'Tolkin',
    begin_with: 471518098,
  },
  {
    id: 6,
    title: 'Fifty Shades of Grey',
    author: 'L James',
    begin_with: 471518098,
  },
];

// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.
const resolvers = {
  Query: {
    books: (parent, args, context, info) => {
      return bookDatabase;
    },
    book: (parent, args, context, info) => {
      console.log(args);
      return bookDatabase.find((x) => x.id === parseInt(args.id));
    },
  },
  Book: {
    createdAt: (parent) => {
      return new Date(parent.begin_with).toISOString();
    },
  },
};

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({ typeDefs, resolvers });

// The `listen` method launches a web server.
server.listen({ port: 4000 }).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
