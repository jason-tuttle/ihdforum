const { RESTDataSource } = require('apollo-datasource-rest');
const tokens = require('../data/tokens');

class UserAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://jason-tuttle.auth0.com/api/v2/';
  }

  willSendRequest(request) {
    request.headers.set('Authorization', this.context.token);
  }

  async getUser(id) {
    const headers = { authorization: `Bearer ${tokens.acces_token}` };
    return this.get(`users/${id}`, headers);
  }

}

module.exports = UserAPI;
