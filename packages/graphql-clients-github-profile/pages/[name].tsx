import {
  ApolloClient,
  ApolloProvider,
  gql,
  InMemoryCache,
  useQuery,
} from '@apollo/client';
import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import Head from 'next/head';
import { Repo } from './';

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

type ProfileProps = {
  username: string;
};

function Profile(props: ProfileProps) {
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
        {data.user.repositories.nodes.map((repo: Repo) => {
          return <li key={repo.id}>{repo.name}</li>;
        })}
      </ul>
    </div>
  );
}

type Props = {
  username: string;
};

export default function Home(props: Props) {
  return (
    <ApolloProvider client={client}>
      <div className="container">
        <h1>Hello</h1>
        <Profile username={props.username} />
      </div>
    </ApolloProvider>
  );
}

export function getServerSideProps(
  context: GetServerSidePropsContext,
): GetServerSidePropsResult<Props> {
  return {
    props: {
      username:
        typeof context.params?.name === 'string' ? context.params.name : '',
    },
  };
}
