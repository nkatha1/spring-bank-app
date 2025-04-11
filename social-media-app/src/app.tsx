// src/App.tsx

import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { INCREMENT_COUNTER, DECREMENT_COUNTER } from './graphql/mutations';

const App = () => {
  // Local state for the counter
  const [count, setCount] = useState(0);

  // Apollo mutations to interact with the backend
  const [incrementCounter] = useMutation(INCREMENT_COUNTER);
  const [decrementCounter] = useMutation(DECREMENT_COUNTER);

  // Function to handle increment action
  const handleIncrement = async () => {
    // Here you can call the GraphQL mutation if needed
    const response = await incrementCounter();
    setCount(response.data.incrementCounter.count); // Update local state with the new count
  };

  // Function to handle decrement action
  const handleDecrement = async () => {
    // Here you can call the GraphQL mutation if needed
    const response = await decrementCounter();
    setCount(response.data.decrementCounter.count); // Update local state with the new count
  };

  return (
    <div>
      <h1>Counter: {count}</h1>
      <button onClick={handleIncrement}>Increment</button>
      <button onClick={handleDecrement}>Decrement</button>
    </div>
  );
};

export default App;