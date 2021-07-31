import fetch from 'isomorphic-unfetch';

export default function Home({ users }) {
  return (
    <div>
      {users.map((user) => (
        <div key={user.id}>{user.name}</div>
      ))}
    </div>
  );
}

export async function getServerSideProps() {
  const response = await fetch('http://localhost:3000/api/graphql', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify({ query: '{ users { id, name } }' }),
  });

  const {
    data: { users },
  } = await response.json();

  return { props: { users } };
}
