// src/graphql/mutations.ts

import { gql } from '@apollo/client';

// Define mutation to increment counter
export const INCREMENT_COUNTER = gql`
  mutation IncrementCounter {
    incrementCounter {
      count
    }
  }
`;

// Define mutation to decrement counter
export const DECREMENT_COUNTER = gql`
  mutation DecrementCounter {
    decrementCounter {
      count
    }
  }
`;