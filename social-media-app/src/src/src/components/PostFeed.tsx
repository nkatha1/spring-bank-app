import React, { useEffect, useState } from 'react';
import { useQuery, gql } from '@apollo/client';

const GET_POSTS = gql`
  query {
    posts {
      id
      content
      likes
      author {
        username
      }
    }
  }
`;

const PostFeed: React.FC = () => {
  const { loading, error, data } = useQuery(GET_POSTS);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (data && data.posts) {
      setPosts(data.posts);
    }
  }, [data]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      {posts.map((post: any) => (
        <div key={post.id} className="border p-4 mb-4">
          <h3>{post.author.username}</h3>
          <p>{post.content}</p>
          <span>{post.likes} Likes</span>
        </div>
      ))}
    </div>
  );
};

export default PostFeed;