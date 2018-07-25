const typeDefs = [`
  type Message {
    id: String!
    message: String
    user: User
    likes: [Like]
    comments: [Comment]
  }
  type User {
    user_id: ID!
    nickname: String
    name: String
    picture: String
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
    user: User
    message: Message!
  }

  # *** INPUT TYPES ***

  input CommentFilterInput {
    user: String!
    messageId: String
  }
  input MessageInput {
    message: String!
    user: String!
  }
  input CommentInput {
    comment: String!
    user: String!
    messageId: ID!
  }

  # *** ROOT LEVEL TYPES ***

  type Query {
    user(user_id: String!): User
    users: [User]
    message(id: ID!): Message
    messages: [Message]
    comment(id: ID!): Comment
    comments(filter: CommentFilterInput): [Comment]
    likes: [Like]
  }
  type Mutation {
    addMessage(messageInput: MessageInput): Message
    addComment(commentInput: CommentInput): Comment
  }

  schema {
    query: Query
    mutation: Mutation
  }
`];

module.exports = typeDefs;
