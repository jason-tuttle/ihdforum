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
  
  # *** INPUT TYPES ***
  
  input CommentFilterInput {
    userId: String
    messageId: String
  }
  input MessageInput {
    message: String!
    userId: ID!
  }
  input CommentInput {
    comment: String!
    userId: ID!
    messageId: ID!
  }
  
  # *** ROOT LEVEL TYPES ***
  
  type Query {
    user(id: ID!): User
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
