'use strict';

const fetch = require('node-fetch');
const tokens = require('../data/tokens');

const baseUrl = 'https://jason-tuttle.auth0.com/api/v2/';

const Users = {
  getUsers() {
    const url = baseUrl + 'users';
    const headers = { authorization: `Bearer ${tokens.acces_token}` };
    return fetch(url, {
      method: 'GET',
      headers,
    })
      .then(res => res.json());
  },

  getUser(id) {
    const url = `${baseUrl}users/${id}`;
    const headers = { authorization: `Bearer ${tokens.acces_token}` };
    return fetch(url, {
      method: 'GET',
      headers,
    })
      .then(res => res.json());
  }
}

module.exports = () => (Users);
