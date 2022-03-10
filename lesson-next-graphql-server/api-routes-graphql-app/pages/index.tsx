import { gql, useLazyQuery } from '@apollo/client';
import { GetServerSidePropsContext } from 'next';
import queryGraphql from '../util/graphql';

type Props =
  | {
      users: { id: number; name: string }[];
    }
  | {
      errors: string[];
    };

const getBooksQuery = gql`
  query {
    books {
      id
      name
    }
  }
`;

export default function Home(props: Props) {
  const [getBooks, { loading, error: booksError, data }] =
    useLazyQuery(getBooksQuery);

  if ('errors' in props) {
    return (
      <div>
        <h1>Errors</h1>
        <ul>
          {props.errors.map((error) => (
            <li key={`error-${error}`}>{error}</li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <div>
      {props.users.map((user) => (
        <div key={user.id}>{user.name}</div>
      ))}
      <button
        onClick={async () => {
          await getBooks();
        }}
      >
        Request books
      </button>
      {loading && <div>Loading...</div>}
      {booksError && <div>Error loading books: {booksError.message}</div>}
      {data && (
        <ul>
          {data.books.map((book: { id: number; name: string }) => (
            <li key={`book-${book.id}`}>{book.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  // Using fetch
  // const response = await fetch('http://localhost:3000/api/graphql', {
  //   method: 'POST',
  //   headers: {
  //     'Content-type': 'application/json',
  //   },
  //   body: JSON.stringify({ query: '{ users { id, name } }' }),
  // });
  // const {
  //   data: { users },
  // } = await response.json();

  const results = await queryGraphql(
    `
      query {
        users {
          id
          name
        }
      }
    `,
    context.res,
  );

  if ('errors' in results) {
    console.log(JSON.stringify(results, null, 2));
    return {
      props: {
        errors: results.errors.map((error) => error.message),
      },
    };
  }

  return {
    props: {
      users: results.data.users,
    },
  };
}
