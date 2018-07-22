const { RESTDataSource } = require('apollo-datasource-rest');

class UserAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://jason-tuttle.auth0.com/api/v2/';
  }

  // willSendRequest(request) {
  //   request.headers.set('Authorization', this.context.token);
  // }

  async getUser(id) {
    console.log('getting User...');
    return this.get(`users/${id}`);
  }

  async getUsers() {
    return this.get('users/');
  }

}

module.exports = UserAPI;
