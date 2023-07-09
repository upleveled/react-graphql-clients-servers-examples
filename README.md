# UNMAINTAINED

This repo was archived on 9 July 2023 - new examples can be found under [the `upleveled` GitHub organization](https://github.com/upleveled), eg. [`upleveled/graphql-example-spring-2023-austria-vienna`](https://github.com/upleveled/graphql-example-spring-2023-austria-vienna)

## Intro

https://ramonh.dev

- Software engineer with over 10 years experience.
- Public speaker.
- Community member.
- Developer educator.
- Live streamer.

## Who are you?

One-two sentence each

## What did you do so far?

Data fetching via HTTP?

- https://egghead.io/api/v1/instructors/nik-graf/lessons
- https://egghead.io/api/v1/instructors/nik-graf/series
- https://orf.at/static-extras/bulawindow.json

Show fetching an requestion data in the browser?
-> https://www.escuelafrontend.com/instructores/ramon-huidobro
Why do we do this? In the end store data somewhere, retrieve it and write it to somewhere.

## GraphQL

A pretty cool way to fetching data.

Why?

- very structured and well defined
- only fetch what you need

-> see presentation.pdf

# Exercise

_Hint_: Using CTRL + Space you can autocomplete fields in the GraphQL IDE.

1. Use the StarWars GraphQL API `https://graphql.github.io/swapi-graphql/` to query:

_Hint_: The schema has some duplications of data e.g. people & edges.node contain the same data. Why's that?

- Query all People
- Query the names of all Starships related to Luke Skywalker!

_Hint_: Get Luke by his id, which you can get from `allPeople`.

- Query the population and all the residents on the planet "Naboo".

2. Use the [GitHub GraphQL API](https://docs.github.com/en/graphql/overview/explorer) to query

- Your repositories (first 10)
- Extend the query to show the default branch of each repository

## Query data

First, create a repository on GitHub (let's base the name on the upcoming exercise. How about something like `graphql-github-profile`?), clone it and `cd` into the directory.

Then create a new React app with `yarn create react-app .` and install [the ESLint config](https://github.com/upleveled/eslint-config-upleveled/)

Then we will go through https://www.apollographql.com/docs/react/get-started/

## Exercise

Build your own Profile page based on GitHub e.g. https://github.com/nikgraf using the GitHub GraphQL Endpoint

- Show your name
- Show your GitHub Avatar
- Show a list of (public) repositories

Other public APIs https://github.com/APIs-guru/graphql-apis

1. Generate an access token:
   https://docs.github.com/en/github/authenticating-to-github/keeping-your-account-and-data-secure/creating-a-personal-access-token

_Hint_:

- `yarn add @apollo/client graphql`

```js
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://api.github.com/graphql",
  cache: new InMemoryCache(),
  headers: {
    authorization: "Bearer TODO",
  },
});
```

```jsx
<ApolloProvider client={client}>…</ApolloProvider>
```

```jsx
import { gql, useQuery } from "@apollo/client";

const profileQuery = gql`
  TODO: YOUR QUERY
`;

export default function Profile(props) {
  const { loading, error, data } = useQuery(profileQuery);

  return null; // TODO: render your component
}
```

## Using Variables

Make the username dynamic and allow to fetch the profile based on the url.

When visiting the `profile/:username` route use the route to fetch data for only the one specific route.

_Hint_: Fetch one place first with a hard coded ID to see if it works and then extend it to use GraphQL variables for the profile username to always fetch the correct profile.

_Hint_:

```jsx
const { loading, error, data } = useQuery(placeQuery, { variables: {} });
```
