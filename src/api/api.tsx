const BASE_URL = 'https://jsonplaceholder.typicode.com/';

const request = (url: string) => fetch(`${BASE_URL}${url}`)
  .then(res => {
    if (!res.ok) {
      throw new Error('Something wrong...');
    }

    return res.json();
  });

export const getUsers = () => request('users');

export const getPosts = (id: number) => request(`posts?userId=${id}`);
