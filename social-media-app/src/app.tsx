// src/App.tsx

import React, { useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { INCREMENT_COUNTER, DECREMENT_COUNTER } from './graphql/mutations';
import { GET_COUNTER } from './graphql/queries';

const App = () => {
  const { data, loading, error, refetch } = useQuery(GET_COUNTER);
  const [incrementCounter, { loading: incLoading }] = useMutation(INCREMENT_COUNTER);
  const [decrementCounter, { loading: decLoading }] = useMutation(DECREMENT_COUNTER);

  const count = data?.getCounter?.count ?? 0;

  const handleIncrement = async () => {
    try {
      await incrementCounter();
      refetch(); // Refresh the count after increment
    } catch (err) {
      console.error('Error incrementing:', err);
    }
  };

  const handleDecrement = async () => {
    try {
      await decrementCounter();
      refetch(); // Refresh the count after decrement
    } catch (err) {
      console.error('Error decrementing:', err);
    }
  };

  if (loading) return <p>Loading counter...</p>;
  if (error) return <p>Error fetching counter: {error.message}</p>;

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>GraphQL Counter</h1>
      <div style={styles.counter}>{count}</div>
      <div style={styles.buttons}>
        <button onClick={handleIncrement} disabled={incLoading} style={styles.button}>
          {incLoading ? 'Incrementing...' : 'Increment'}
        </button>
        <button onClick={handleDecrement} disabled={decLoading} style={styles.button}>
          {decLoading ? 'Decrementing...' : 'Decrement'}
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    fontFamily: 'sans-serif',
    textAlign: 'center' as const,
    marginTop: '100px',
  },
  title: {
    fontSize: '32px',
    marginBottom: '30px',
  },
  counter: {
    fontSize: '48px',
    marginBottom: '20px',
    color: '#333',
  },
  buttons: {
    display: 'flex',
    justifyContent: 'center' as const,
    gap: '20px',
  },
  button: {
    padding: '10px 20px',
    fontSize: '18px',
    cursor: 'pointer',
  },
};

export default App;