const { RESTDataSource } = require('apollo-datasource-rest');

class UserAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://jason-tuttle.auth0.com/api/v2/';
  }

  willSendRequest(request) {
    const token = this.context.token.access_token;
    request.headers.set('Authorization', `Bearer ${token}`);
  }

  async getUser(id) {
    return this.get(`users/${id}`);
  }

  async getUsers() {
    return this.get('users/');
  }

}

module.exports = UserAPI;
