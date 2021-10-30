import { gql, useQuery } from '@apollo/client';
import React from 'react';

const profileQuery = gql`
  query ($username: String!, $first: Int!) {
    user(login: $username) {
      avatarUrl
      company
      repositories(
        first: $first
        orderBy: { field: UPDATED_AT, direction: ASC }
      ) {
        nodes {
          id
          name
          updatedAt
        }
      }
    }
  }
`;

function App() {
  // example url: http://localhost:3000/karlhorky?first=5
  const username = window.location.pathname.replace('/', '') || 'karlhorky';
  const limit = parseInt(window.location.search.replace('?first=', '')) || 10;

  const { loading, error, data } = useQuery(profileQuery, {
    variables: { username: username, first: limit },
  });
  if (loading) return 'Loading …';
  if (error) return 'Something went wrong!';

  // console.log(data.user.repositories);

  return (
    <div className="App">
      <img src={data.user.avatarUrl} height="200" alt="Profile" />
      <p>{data.user.company}</p>
      <ul>
        {data.user.repositories.nodes.map((repo) => {
          return <li key={repo.id}>{repo.name}</li>;
        })}
      </ul>
    </div>
  );
}

export default App;
