import React, { useState, useEffect } from 'react';
import { getUsers } from './api/api';
import { UserCard } from './components/UserCard';
import { UserPosts } from './components/UserPosts';
import { User } from "./types/User";
import classNames from 'classnames';
import './App.scss';

const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [visiableUsers, setVisiableUsers] = useState<User[]>([]);
  const [query, setQuery] = useState('');
  const [activePage, setActivePage] = useState(1);
  const [maxPages, setMaxPages] = useState(0);
  const [selectedUserId, setSelectedUserId] = useState(0);
  const [sort, setSort] = useState(false);

  const getSorted = () => {
    if (!sort) {
      setVisiableUsers(visiableUsers.sort((userA, userB) =>
        userA.name.localeCompare(userB.name)
      ));
    } else {
      setVisiableUsers(visiableUsers.sort((userA, userB) =>
        userA.id - userB.id
      ));
    }
  };

  const getShowedPosts = (id: number) => {
    setSelectedUserId(id);
  };

  const screenWidth = window.screen.width;
  const [offset, setOffset] = useState(0);

  const handlerClick = (char: string) => {
    let listHeightAndPadding = 0;
    if (screenWidth > 1023) {
    selectedUserId === 0
      ? (listHeightAndPadding = 770 + 30)
      : (listHeightAndPadding = 560 + 30);
    } else if (screenWidth >= 768 && screenWidth < 1023) {
      (listHeightAndPadding = 502 + 30)
    } else if (screenWidth < 768) {
      (listHeightAndPadding = 338 + 16);
    }
    
    switch (char) {
      case 'prev':
        setOffset((prevState) => prevState + listHeightAndPadding)
        break
      case 'next':
        setOffset((prevState) => prevState - listHeightAndPadding)
        break
    }
  };

  useEffect(() => {
    getUsers().then(data => setUsers(data));
  }, []);
  
  useEffect(() => {
    setVisiableUsers(users);
    if (screenWidth >= 474 && screenWidth < 767) {
      setMaxPages(Math.ceil(users.length / 6));
    } else {
      setMaxPages(Math.ceil(users.length / 4))
    }
  }, [users]);

  useEffect(() => {
    setVisiableUsers(users.filter(
      user => user.name.toLowerCase().includes(query.toLowerCase())
    ));
  }, [query]);

  useEffect(() => {
    setOffset(0);
    setSelectedUserId(0);
  }, [visiableUsers]);

  useEffect(() => {
    if (selectedUserId === 0) {
      setOffset(0);
      setActivePage(1);
    }
  }, [selectedUserId]);

  return (
    <div className="app">
      <div className="app__conteiner">
        <div className="app__header" id="header">
          <button
            className={
              classNames("app__sort",
                {"app__sort--sorted": sort}
              )
            }
            onClick={() => {
              setSort(!sort);
              getSorted();
            }}
          >
            {sort ? 'Sort by name' : 'Sort by id'}
          </button>
          <label className="app__label">
            <input
              className="app__search"
              type="text"
              placeholder="Search"
              value={query}
              onChange={event => setQuery(event.target.value)}
            />
            {query.length > 0 && (
              <button
                type="button"
                className="app__queryDestroy"
                onClick={() => setQuery('')}
              >
                X
              </button>
            )}
          </label>
        </div>

        <div className="app__content">
          <div
            className={
              classNames("app__usersConteiner",
                {"app__usersConteiner--openPosts": selectedUserId !==0}
              )
            }
          >
            <ul
              className="app__usersList"
              style={{
                transform: `translateY(${offset}px)`,
              }}
            >
              {visiableUsers.map(user => (
                <li key={user.id}>
                  <UserCard
                    user={user}
                    showPosts={getShowedPosts}
                    selectedUserId={selectedUserId}
                  />
                </li>
              ))}
            </ul>
          </div>
          {selectedUserId > 0 && (
            <UserPosts
              selectedUserId={selectedUserId}
            />
          )}
        </div>
        <div className="app__footer">
          <button
            type="button"
            className="app__pagination app__pagination--prev"
            disabled={activePage === 1}
            onClick={() => {
              setActivePage(activePage - 1);
              handlerClick('prev');
            }}
          >
            Previous
          </button>
          <button
            type="button"
            className="app__pagination app__pagination--next"
            disabled={activePage === maxPages}
            onClick={() => {
              setActivePage(activePage + 1);
              handlerClick('next');
            }}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
