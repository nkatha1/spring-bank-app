import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';

// GraphQL mutation for creating a post
const CREATE_POST = gql`
  mutation CreatePost($content: String!) {
    createPost(content: $content) {
      id
      content
      likes
      author {
        username
      }
    }
  }
`;

const CreatePost: React.FC = () => {
  const [content, setContent] = useState('');
  const [createPost, { loading, error }] = useMutation(CREATE_POST);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return; // Do not submit if content is empty

    try {
      await createPost({ variables: { content } });
      setContent(''); // Reset input field
    } catch (err) {
      console.error('Error creating post:', err);
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto bg-white rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-4">Create a Post</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="What's on your mind?"
          className="w-full p-2 mb-4 border border-gray-300 rounded-md"
          rows={4}
        />
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-gray-400"
        >
          {loading ? 'Posting...' : 'Post'}
        </button>
      </form>
      {error && <p className="text-red-500 mt-2">{error.message}</p>}
    </div>
  );
};

export default CreatePost;