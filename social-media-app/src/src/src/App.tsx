import React from 'react';
import CreatePost from './components/CreatePost';
import PostFeed from './components/PostFeed';

function App() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-blue-100">
      <h1 className="text-4xl font-bold mb-4">Vite + React Social Media App</h1>
      
      {/* Create Post Section */}
      <CreatePost />

      {/* Post Feed Section */}
      <PostFeed />
    </div>
  );
}

export default App;