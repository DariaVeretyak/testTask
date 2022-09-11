import React, { useEffect, useState } from 'react';
import { getPosts } from "../../api/api";
import { Post } from "../../types/Post";

type Props = {
  selectedUserId: number;
};

export const UserPosts: React.FC<Props> = ({ selectedUserId }) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [openPost, setOpenPost] = useState(0);

  useEffect(() => {
    getPosts(selectedUserId)
      .then(setPosts);
  }, [selectedUserId]);

  return (
    <div className="userPosts">
      <ul className="userPosts__list">
        {posts.map(post => (
          <li className="userPosts__postItem" key={post.id}>
            <a
              className="userPosts__postTitle"
              onClick={() => {
                openPost === post.id
                  ? setOpenPost(0)
                  :setOpenPost(post.id)
              }}
            >
              {post.title[0].toUpperCase() + post.title.slice(1)}
            </a>
            {openPost === post.id && (
              <p className="userPosts__postBody">{post.body}</p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};
