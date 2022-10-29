import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';
import AddRecipe from './AddRecipe';
import Recipes from './Recipes';

const client = new ApolloClient({
  uri: 'http://localhost:4000',
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div>
        <Recipes />
      </div>
      <hr />
      <AddRecipe />
    </ApolloProvider>
  );
}

export default App;
