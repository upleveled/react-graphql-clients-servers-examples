import Link from 'next/link';
import queryGraphql from '../shared/query-graphql';

export type User = {
  name: string;
  username: string;
};

type Props = {
  users: User[];
};

export default function UserListing({ users }: Props) {
  return (
    <div>
      <h1>User Listing</h1>
      <ul>
        {users.map((user) => (
          <li key={user.username}>
            <Link href={`/${user.username}`}>{user.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export async function getStaticProps() {
  const { users } = await queryGraphql(`
    query {
      users {
        name
        username
      }
    }
  `);
  return {
    props: {
      users,
    },
  };
}
