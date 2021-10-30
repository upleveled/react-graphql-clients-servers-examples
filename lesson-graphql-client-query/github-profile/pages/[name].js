import {
  ApolloClient,
  ApolloProvider,
  gql,
  InMemoryCache,
  useQuery,
} from '@apollo/client';
import Head from 'next/head';

const client = new ApolloClient({
  uri: 'https://api.github.com/graphql',
  cache: new InMemoryCache(),
  headers: {
    authorization: `Bearer ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,
  },
});

const githubQuery = gql`
  query profileQuery($name: String!) {
    user(login: $name) {
      id
      login
      avatarUrl
      repositories(last: 10) {
        nodes {
          id
          name
        }
      }
    }
  }
`;

const Profile = (props) => {
  const { loading, error, data } = useQuery(githubQuery, {
    variables: {
      name: props.username,
    },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Oop something went wrong :(</p>;

  return (
    <div>
      <Head>
        <title>{data.user.login}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <img src={data.user.avatarUrl} alt="" />
      <ul>
        {data.user.repositories.nodes.map((repo) => {
          return <li key={repo.id}>{repo.name}</li>;
        })}
      </ul>
    </div>
  );
};

export default function Home(props) {
  return (
    <ApolloProvider client={client}>
      <div className="container">
        <h1>Hello</h1>
        <Profile username={props.username} />
      </div>
    </ApolloProvider>
  );
}

export function getServerSideProps(context) {
  return { props: { username: context.params.name } };
}
