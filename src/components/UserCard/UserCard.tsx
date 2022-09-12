import React from 'react';
import { User } from '../../types/User';
import classNames from 'classnames';

type Props = {
  user: User;
  showPosts: (id: number) => void;
  selectedUserId: number;
};

export const UserCard: React.FC<Props> = ({ user, showPosts, selectedUserId }) => {
  return (
    <div
      className={
        classNames("userCard",
          {"userCard--openPosts": selectedUserId !==0}
        )
      }
    >
      <div className="userCard__description">
        <p className="userCard__info">{user.name}</p>
        <a
          className="userCard__info"
          href='mailto: ${user.email}'
        >
          {user.email}
        </a>
        <a
          className="userCard__info"
          href="tel: ${user.phone}"
        >
          {user.phone}
        </a>
        <a className="userCard__info" href={user.website}>{user.website}</a>
      </div>
      {selectedUserId !== user.id ? (
        <button
          type="button"
          className={
            classNames("userCard__showPosts",
              {"userCard__showPosts--openPosts": selectedUserId !==0}
            )
          }
          onClick={() => showPosts(user.id)}
        >
          Show all posts
        </button>
      ) : (
        <button
          type="button"
          className={
            classNames("userCard__showPosts",
              {"userCard__showPosts--openPosts": selectedUserId !==0}
            )
          }
          onClick={() => showPosts(0)}
        >
          Close posts
        </button>
      )}
    </div>
  );
};
