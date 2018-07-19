const fetch = require('node-fetch');

export function getUsers() {
  const url = 'https://jason-tuttle.auth0.com/api/v2/users';
  return fetch(url)
    .then(res => res.json());
}
