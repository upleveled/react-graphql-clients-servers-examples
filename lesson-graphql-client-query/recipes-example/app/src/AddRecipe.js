import { useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { useState } from 'react';

const addRecipeMutation = gql`
  mutation addRecipe($title: String!) {
    addRecipe(title: $title, vegetarian: true) {
      id
      title
    }
  }
`;

const recipesQuery = gql`
  {
    recipes {
      title
    }
  }
`;

function AddRecipe() {
  const [title, setTitle] = useState('');
  const [addRecipe, result] = useMutation(addRecipeMutation, {
    refetchQueries: [{ query: recipesQuery }],
    variables: { title: title },
  });

  return (
    <div>
      <input
        value={title}
        onChange={(evt) => setTitle(evt.target.value)}
        placeholder="Recipe title"
      />
      <button
        onClick={async () => {
          await addRecipe();
        }}
        disabled={result.loading}
      >
        Add
      </button>
      <div>
        {result.loading === true && <p>saving …</p>}
        {result.error && <p>Something bad happened</p>}
        {result.data && <p>Successfully saved</p>}
      </div>
    </div>
  );
}

export default AddRecipe;
