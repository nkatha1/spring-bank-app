// src/graphql/queries.ts

import { gql } from '@apollo/client';

// Define the query to get the current counter value
export const GET_COUNTER = gql`
  query GetCounter {
    counter {
      count
    }
  }
`;