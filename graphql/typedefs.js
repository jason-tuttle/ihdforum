const typeDefs = [`
  type Message {
    id: String!
    message: String
    user: User
    likes: [Like]
    comments: [Comment]
  }
  type User {
    id: String!
    username: String
    displayname: String
    messages: [Message]
    comments: [Comment]
    likes: [Like]
  }
  type Comment {
    id: String!
    comment: String
    user: User
    message: Message
  }
  type Like {
    id: String!
    user: User!
    message: Message!
  }
  input CommentFilterInput {
    userId: String
    messageId: String
  }
  type Query {
    user(id: ID!): User
    message(id: ID!): Message
    messages: [Message]
    comment(id: ID!): Comment
    comments(filter: CommentFilterInput): [Comment]
    likes: [Like]
  }

  schema {
    query: Query
  }
`];

module.exports = typeDefs;
