// src/main.tsx

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; //  main App component
import './index.css'; // Optional: // global CSS
import { ApolloProvider } from '@apollo/client'; // Import ApolloProvider
import client from './apollo-client'; // Import the Apollo Client instance

// Render the app and wrap it with ApolloProvider
ReactDOM.createRoot(document.getElementById('root')!).render(
  <ApolloProvider client={client}> {/* Provide the Apollo Client to the app */}
    <App />
  </ApolloProvider>
);