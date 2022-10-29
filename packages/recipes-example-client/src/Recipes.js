import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { useState } from 'react';

const recipesQuery = gql`
  query ($veggie: Boolean!) {
    recipes(vegetarian: $veggie) {
      title
      vegetarian
    }
  }
`;

function Recipes() {
  const [filterForVeggie, setFilterForVeggie] = useState(false);
  const result = useQuery(recipesQuery, {
    variables: { veggie: filterForVeggie },
  });

  if (result.loading) {
    return <div>Loading …</div>;
  }

  if (result.error) {
    return <div>Something wrong.</div>;
  }

  return (
    <div>
      <label>
        <input
          type="checkbox"
          checked={filterForVeggie}
          onChange={(evt) => setFilterForVeggie(evt.target.checked)}
        />
        filter for veggie
      </label>
      {result.data.recipes.map((recipe) => (
        <div
          key={`recipe-${recipe.title
            .toLowerCase()
            .replace(/[^a-zA-Z0-9]+/, '-')}`}
        >
          {recipe.title}
        </div>
      ))}
    </div>
  );
}

export default Recipes;
