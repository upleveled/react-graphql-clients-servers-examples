import { GetStaticPropsContext } from 'next';
import queryGraphql from '../shared/query-graphql';
import { User } from './';

type Props = {
  user?: User;
};

export default function UserProfile({ user }: Props) {
  if (!user) {
    return <h1>User Not Found</h1>;
  }
  return (
    <h1>
      {user.username} is {user.name}
    </h1>
  );
}

export async function getStaticProps(context: GetStaticPropsContext) {
  const { user = null } = await queryGraphql(
    `
    query($username: String) {
      user(username: $username) {
        name
        username
      }
    }
  `,
    {
      username: context.params?.username,
    },
  );
  return { props: { user } };
}

export async function getStaticPaths() {
  const { users } = await queryGraphql(`
    query {
      users {
        username
      }
    }
  `);
  return {
    paths: (users as User[]).map(({ username }) => ({
      params: { username },
    })),
    fallback: true,
  };
}
