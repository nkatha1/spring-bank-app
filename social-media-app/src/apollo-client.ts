// src/apollo-client.ts
import { ApolloClient, InMemoryCache } from '@apollo/client';

// Retrieve the token from localStorage (or wherever you store it after login)
const token = localStorage.getItem('token');

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',  // Your GraphQL server URL
  cache: new InMemoryCache(),
  headers: {
    Authorization: token ? `Bearer ${token}` : '',  // Send the token if it exists
  },
});

export default client;